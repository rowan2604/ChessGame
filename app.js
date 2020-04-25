const opn = require('opn')
const express = require('express');
const app = express();
const session = require('express-session');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mysql = require('mysql');
const bodyParser = require("body-parser");
const movements = require('./static/js/movements.js');

let numberPlayer = 0;
let username = [];
let gameState = [ //-1: no piece spaces else, unique ID of each pieces
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



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 9000000 // 2.5h en ms
    }
}));

app.get('/', function (req, res) {
    if (req.session.loggedin) {
        res.render('welcome.html', {
            username: req.session.username
        });
    } else {
        let error = req.session.error;
        req.session.error = null
        res.render('index.html', {
            error: error
        });
    }
});

app.get('/welcome', function (req, res) {
    if (req.session.loggedin) {
        res.render('welcome.html', {
            username: req.session.username
        });
    } else {
        let error = req.session.error;
        req.session.error = null;
        res.render('index.html', {
            error: error
        });
    }
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

    socket.on('clicked', data => {
        let pieceID = gameState[data.y][data.x];
        socket.emit('selectPiece', pieceID);
    });

    socket.on('sv_move', data => { // sv for server side
        if (turn == data.username) {
            if ((data.color == 'white' && turn == username[0]) || (data.color == 'black' && turn == username[1])) {
                let availableMoves = movements.getAvailableMoves(data.type, data.color, data.coordinates, data.isFirstMove, gameState);
                let response = {
                    availableMoves: availableMoves,
                    state: gameState,
                    color: data.color,
                    size: data.size
                };
                socket.emit('draw', response);

                let isMovePossible = movements.movementIsPossible(availableMoves, data.lastClickedCoordinates);
                if (isMovePossible) {
                    (turn == username[0]) ? turn = username[1]: turn = username[0];
                    let moveInfo; // Will send different informations to the client depending on ther action (move or kill)
                    if (gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x] == -1) { // The target position is free
                        moveInfo = {
                            isKilling: false,
                            id: data.id,
                            lastClickedCoordinates: data.lastClickedCoordinates,
                            turn: (turn == username[0]) ? 0 : 1
                        }
                        // Change the tab of pieces positions
                        let a = gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x];
                        let b = gameState[data.coordinates.y][data.coordinates.x];
                        gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x] = b;
                        gameState[data.coordinates.y][data.coordinates.x] = a;
                    } else { // Else it's an ennemy
                        moveInfo = {
                            isKilling: true,
                            enemyID: gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x],
                            id: data.id,
                            lastClickedCoordinates: data.lastClickedCoordinates,
                            turn: (turn == username[0]) ? 0 : 1
                        }
                        gameState[data.lastClickedCoordinates.y][data.lastClickedCoordinates.x] = gameState[data.coordinates.y][data.coordinates.x];
                        // Replace old location by -1 (no piece)
                        gameState[data.coordinates.y][data.coordinates.x] = -1;
                        // Send info to kill the other piece
                    }
                    // Send infos to the client 
                    socket.emit('move', moveInfo);
                    socket.broadcast.emit('move', moveInfo);
                    //turn == 0 ? turn = 1 : turn = 0;     // Swap turn
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
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
});


mysqlConfig.connect(function (err) {
    if (err) {
        throw err;
    }
});

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/signup', function (request, response) {
    let username = request.body.user;
    let password = request.body.pass;
    if (username && password) {
        mysqlConfig.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
            if (results.length == 0) {
                mysqlConfig.query('INSERT into users (username, password) VALUES(?,?)', [username, password], function (error, results, fields) {
                    if (!error) {
                        console.log("Inscription reussie OK");
                        request.session.loggedin = true;
                        request.session.username = username;
                        response.redirect('/welcome');
                    }
                    response.end();
                });

            } else {
                request.session.error = "User already exists";
                response.redirect('/');
            }
        });
    } else {
        request.session.error = "Please enter Username and Password!";
        response.redirect('/');
    }
});

app.post('/signin', function (request, response) {
    let username = request.body.user;
    let password = request.body.pass;
    if (username && password) {
        mysqlConfig.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                console.log("connexion OK");
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/welcome');
            } else {
                request.session.error = "Incorrect Username and/or Password";
                response.redirect('/');
            }
            response.end();
        });
    } else {
        request.session.error = "Please enter Username and Password!";
        response.redirect('/');
    }
});


app.post('/logout', function (request, response) {

    request.session.loggedin = false;
    request.session.username = "";
    response.redirect('/');

});