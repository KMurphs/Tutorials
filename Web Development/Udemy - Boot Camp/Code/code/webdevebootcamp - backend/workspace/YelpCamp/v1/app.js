// Setting up the enviroment
var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var helpDebug = true;

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
        {name: 'Salmon Creek', image: 'https://acadiamagic.com/940x366/campground-1301.jpg'},
        {name: 'Salmon Creek', image: 'https://acadiamagic.com/940x366/campground-1301.jpg'},
        {name: 'Salmon Creek', image: 'https://acadiamagic.com/940x366/campground-1301.jpg'},
        {name: 'Granite Hill', image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg'},
        {name: 'Granite Hill', image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg'},
        {name: 'Granite Hill', image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg'},
        {name: 'Mountain Goat\'s Rest', image: 'https://www.campjellystone.com/wp/wp-content/uploads/2012/08/PennsylvaniaCampgrounds1.jpg'},
        {name: 'Mountain Goat\'s Rest', image: 'https://www.campjellystone.com/wp/wp-content/uploads/2012/08/PennsylvaniaCampgrounds1.jpg'}
    ]

//////////////Server Routes


//Home Page GET request route
app.get('/', function(req, res){
    if(helpDebug)console.log('A GET Request to the Home Page was just made to the server'); 
    res.render('home');
});

//campgrounds Page GET request route
app.get('/campgrounds', function(req, res){
    if(helpDebug)console.log('A GET Request to the CampGrounds Page was just made to the server'); 
    res.render('campground', {campgrounds: campgrounds});
});

//campgrounds Page POST request route
app.post('/campgrounds', function(req, res){
    var ParsedData = bodyParser(req);
    console.log(req.body);
    var new_camp = {name: req.body.name, image: req.body.image};
    
    campgrounds.push(new_camp);
    
    if(helpDebug)console.log('A POST Request to the CampGrounds Page was just made to the server'); 
    res.redirect('/campgrounds');
});

//new campgrounds Page GET request route
app.get('/campgrounds/new', function(req, res){
    if(helpDebug)console.log('A GET Request to the new campground page was just made to the server'); 
    res.render('newcampground');
});

//Catch all route, default route for unhandled GET requests
app.get('*', function(req, res){
    if(helpDebug)console.log('An unhandled GET Request was just made to the server'); 
    res.render('default');
});



/////////////Starting the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('YelpCamp Server has started!'); 
});

