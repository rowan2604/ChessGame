const io = require('socket.io')(0905)
let numberPlayer = 0;

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