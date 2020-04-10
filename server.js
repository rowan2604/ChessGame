const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let numberPlayer = 0;

//---------------------------------- Express ---------------------------------//

app.use(express.static(__dirname + '/static'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//---------------------------------- Server ----------------------------------//

io.on('connection', socket => {
    console.log("new connection");

    socket.on('username', data => {
        socket.username = data;
        numberPlayer++;
        console.log(socket.username);
    });

    socket.on('play', data => {
        console.log(socket.username + data);
        socket.broadcast.emit('play', data);
    });
})

server.listen(0905);