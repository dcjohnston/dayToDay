var express = require('express');
var database = require('./data');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/todo', function(req, res){
    console.log('received query');
    console.log(database.readData());
    
    res.send(database.readData());
});

app.post('/todo/:key', function(req, res){
    var content = req.body;
    console.log(req.body);
    res.json(database.createData(req.body));
});

app.delete('/todo/:key', function(req, res){
    database.deleteData();
});

app.put('/todo/:key', function(req, res){
    database.updateData();
});

//catch all so i can actually jam out with my single paged-ness
// if the browser requests app/login, i return index.html,
// angular updates location clientside
app.use('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(5000, function(){

});
