const port = 4020
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/assets/home.html');
});