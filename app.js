const opn = require('opn')
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mysql = require('mysql');
const bodyParser = require("body-parser");
const movements = require('./static/js/movements.js');

let numberPlayer = 0;
let username = [];
let gameState = [                              //-1: no piece spaces else, unique ID of each pieces
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31]
    ];

let turn = "";


//---------------------------------- Express ---------------------------------//

app.use(express.static(__dirname + '/static'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//---------------------------------- Server ----------------------------------//

io.on('connection', socket => {
    socket.on('username', data => {
        if (numberPlayer < 2) {
            numberPlayer++;
            username.push(data);
            if (numberPlayer == 1) {
                turn = username[0];
            }
            if (numberPlayer == 2) {
                //username = ["Guest", "player2"];///Debug
                socket.emit('setup', username[0]);
                socket.broadcast.emit('setup', username[1]);
            } else {
                socket.emit('setup', "wait");
            }
        } else {
            socket.emit('setup', "full");
        }
    });

    // INGAME SERVER SIDE

    socket.on('clicked', data =>{
        let pieceID = gameState[data.y][data.x];
        socket.emit('selectPiece', pieceID);
    });
    
    socket.on('sv_move', data => {              // sv for server side
        if (turn == data.username) {
            if ((data.color == 'white' && turn == username[0]) || (data.color == 'black' && turn == username[1])) {
                let availableMoves =  movements.getAvailableMoves(data.type, data.color, data.coordinates, data.isFirstMove, gameState);
                let response = {
                    availableMoves: availableMoves,
                    state: gameState,
                    color: data.color,
                    size: data.size
                };
                socket.emit('draw', response);

                let isMovePossible = movements.movementIsPossible(availableMoves, data.lastClickedCoordinates);
                if (isMovePossible) {
                    let moveInfo;               // Will send different informations to the client depending on ther action (move or kill)
                    if(gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x] == -1){       // The target position is free
                        moveInfo = {
                            isKilling: false,
                            id: data.id,
                            lastClickedCoordinates: data.lastClickedCoordinates
                        }
                        // Change the tab of pieces positions
                        let a = gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x];
                        let b = gameState[data.coordinates.y][data.coordinates.x];
                        gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x] = b;
                        gameState[data.coordinates.y][data.coordinates.x] = a;
                    }
                    else{                                                                                       // Else it's an ennemy
                        moveInfo = {
                            isKilling: true,
                            enemyID: gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x],
                            id: data.id,
                            lastClickedCoordinates: data.lastClickedCoordinates
                        }
                        gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x] = gameState[data.coordinates.y][data.coordinates.x];
                        // Replace old location by -1 (no piece)
                        gameState[data.coordinates.y][data.coordinates.x] = -1;
                        // Send info to kill the other piece
                    }
                    // Send infos to the client 
                    console.log(gameState);
                    socket.emit('move', moveInfo);
                    socket.broadcast.emit('move', moveInfo);
                    (turn == username[0]) ? turn = username[1] : turn = username[0];
                }
            }
        }
        
    });

    socket.on('play', data => {
        console.log(socket.username + data);
        socket.broadcast.emit('play', data);
    });
})

server.listen(0905);
opn('http://localhost:905/')

//---------------------------------- mySql ---------------------------------//

let mysqlConfig = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7334491',
    password: 'VgwJqqpjkc',
    database: 'sql7334491',
});


 mysqlConfig.connect(function (err) {
    if (err) {
        throw err;
    }
});
 
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.text({
    type: "application/json"
}));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

let myRouter = express.Router();
// on creer un chemin de routage pour sign up
myRouter.route('/signup')
    .post(function (req, res) {
        let body = JSON.parse(req.body);
        // on verifie l'existence de l'username dans la bdd pour la creation du compte
        let query_verifuser = "SELECT * FROM users WHERE username='" + body.username + "'";
        mysqlConfig.query(query_verifuser, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    error: 'Error query_verifuser'
                });
            } else {
                if (result.length == 0) {
                   // on l'ajoute a la bdd
                   if(body.username!='' && body.password!='' ){
                    var query_signup = "INSERT INTO users (username, password) VALUES ('" + body.username + "', '" + body.password + "')";}
                    mysqlConfig.query(query_signup, function (err, result) {
                        if (err) {
                            res.status(500);
                            res.json({
                                error: 'Error query_signup'
                            });
                        } else {
                            console.log("1 record inserted");
                            res.status(200);
                            res.json("Inscription reussie");
                        }
                    });
                } else {
                    res.status(500);
                    res.json({
                        error: 'username_already_used'
                    });
                }
            }
        });

    });
    // on creer un chemin de routage pour sign in
myRouter.route('/signin')
    .post(function (req, res) {
        let body = JSON.parse(req.body);
    // on verfier le nom de l'utilisitaur avec son mot de passe et on affiche un message correspendant       
        let query_verifuser = "SELECT * FROM users WHERE username='" + body.username + "' AND password='" + body.password + "'";
        mysqlConfig.query(query_verifuser, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    error: 'Error query_verifuser'
                });
            } else {
                if (result.length == 0) {
                    res.status(500);
                    res.json({
                        error: 'Username or password incorrect'
                    });
                } else {
                    res.status(200);
                    res.json("Welcome");
            
                }
            }
        });

    });

app.use(myRouter);

