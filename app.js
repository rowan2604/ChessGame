const opn = require('opn')
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mysql = require('mysql');
const bodyParser = require("body-parser");

let numberPlayer = 0;
let username = [];

//---------------------------------- Express ---------------------------------//

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.text({
    type: "application/json"
}));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var myRouter = express.Router();

myRouter.route('/signup')
    .post(function (req, res) {
        var body = JSON.parse(req.body);
        var query_verifuser = "SELECT * FROM users WHERE username='" + body.username + "'";
        mysqlConfig.query(query_verifuser, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    error: 'Error query_verifuser'
                });
            } else {
                if (result.length == 0) {
                    var query_signup = "INSERT INTO users (username, password) VALUES ('" + body.username + "', '" + body.password + "')";
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
myRouter.route('/signin')
    .post(function (req, res) {
        var body = JSON.parse(req.body);
        var query_verifuser = "SELECT * FROM users WHERE username='" + body.username + "' AND password='" + body.password + "'";
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

//---------------------------------- Server ----------------------------------//

io.on('connection', socket => {
    socket.on('username', data => {
        if (numberPlayer < 2) {
            numberPlayer++;
            username.push(data);
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

    socket.on('play', data => {
        console.log(socket.username + data);
        socket.broadcast.emit('play', data);
    });
})

server.listen(0905);
opn('http://localhost:905/')

//---------------------------------- mySql ---------------------------------//

var mysqlConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    //database: 'mydb',
});


/*mysqlConfig.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    mysqlConfig.query("CREATE DATABASE mydb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });*/


mysqlConfig.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("DB Connected");
});

/*mysqlConfig.connect(function(err) {
    var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))";
    mysqlConfig.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/