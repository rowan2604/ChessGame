var express = require('express');
var app = express();
app.listen(4020);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/assets/html/home.html');
});