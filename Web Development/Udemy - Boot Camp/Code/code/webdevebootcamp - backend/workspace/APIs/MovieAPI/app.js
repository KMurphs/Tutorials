var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

// omdbapi.com

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//Serving Routes
app.get('/', function(req, res){
    console.log('A GET request to the Home Page was made');
    res.render('home');
});


app.get('*', function(req, res){
    console.log('An unsupported GET request was made');
    res.send('<h1>The page you are looking for does not exists</h1>')
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server is listening');
});