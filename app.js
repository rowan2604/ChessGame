const opn = require('opn')
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mysql = require('mysql');

let numberPlayer = 0;
let username = [];

//---------------------------------- Express ---------------------------------//

app.use(express.static(__dirname + '/static'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//---------------------------------- Server ----------------------------------//

io.on('connection', socket => {
    socket.on('username', data => {
        username.push(data);
        numberPlayer++;
        if(numberPlayer == 2){
            socket.emit('setup', username[0]);
            socket.broadcast.emit('setup', username[1]);
        }
        else {
            socket.emit('setup', "wait");
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

//Juan here