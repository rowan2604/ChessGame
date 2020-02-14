var express = require('express');
var app = express();
const server = require('http').createServer(app);
server.listen(4020);

app.get('/', function(req, res) {
    console.log("New connection server.");
    res.sendfile(__dirname + '/assets/html/home.html');
});