var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Route home page to client index file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(path.join(__dirname + '/client')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.listen('3000', function () {
    console.log('Im listening...');
});