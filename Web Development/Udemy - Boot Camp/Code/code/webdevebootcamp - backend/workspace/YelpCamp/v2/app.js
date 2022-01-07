// Setting up the enviroment
// var express = require("express");
// var bodyParser = require("body-parser");
// var request = require('request');
// var helpDebug = true;
// var mongoose = require('mongoose');

var express    = require("express"),
    bodyParser = require("body-parser"),
    request    = require('request'),
    helpDebug  = true,
    mongoose   = require('mongoose'),
    app = express();
    
    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose.connect('mongodb://localhost/yelpcamp'); //Connects to (and create the db)
//Gets rid of the deprecation warning
mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true}); //Connects to (and create the db)

//Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         //  name: 'Salmon Creek', 
//         //  image: 'https://acadiamagic.com/940x366/campground-1301.jpg'
//         // description: 'This is a huge granite hill, no bathrooms. No water. Beautiful Granite!'
    
//         name: 'Granite Hill', 
//         image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg',
//         description: 'This is a huge granite hill, no bathrooms. No water. Beautiful Granite!'
        
//     }, function (err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log('Newly Created Campground: ');
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//         {name: 'Salmon Creek', image: 'https://acadiamagic.com/940x366/campground-1301.jpg'},
//         {name: 'Salmon Creek', image: 'https://acadiamagic.com/940x366/campground-1301.jpg'},
//         {name: 'Salmon Creek', image: 'https://acadiamagic.com/940x366/campground-1301.jpg'},
//         {name: 'Granite Hill', image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg'},
//         {name: 'Granite Hill', image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg'},
//         {name: 'Granite Hill', image: 'https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg'},
//         {name: 'Mountain Goat\'s Rest', image: 'https://www.campjellystone.com/wp/wp-content/uploads/2012/08/PennsylvaniaCampgrounds1.jpg'},
//         {name: 'Mountain Goat\'s Rest', image: 'https://www.campjellystone.com/wp/wp-content/uploads/2012/08/PennsylvaniaCampgrounds1.jpg'}
//     ]

//////////////Server Routes


//Home Page GET request route
app.get('/', function(req, res){
    if(helpDebug)console.log('A GET Request to the Home Page was just made to the server'); 
    res.render('home');
});

//campgrounds Page GET request route
app.get('/campgrounds', function(req, res){
    if(helpDebug)console.log('A GET Request to the CampGrounds Page was just made to the server'); 
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err)
        }else{
            res.render('index'/*the ejs file*/, {campgrounds: allcampgrounds});
        }
    });
});

//campgrounds Page POST request route
app.post('/campgrounds', function(req, res){
    var ParsedData = bodyParser(req);
    console.log(req.body);
    var new_camp = {name: req.body.name, image: req.body.image, description: req.body.description};
    console.log(new_camp);
    //campgrounds.push(new_camp);
    //Create a new campground and add to db
    Campground.create(new_camp, function(err, newlyCreated){
        if(err){
            console.log('Error while adding campground entry')
        }else{
            if(helpDebug)console.log('A POST Request to the CampGrounds Page was just made to the server'); 
            res.redirect('/campgrounds');          
        }
    })
    
    

});

//new campgrounds Page GET request route
app.get('/campgrounds/new', function(req, res){
    if(helpDebug)console.log('A GET Request to the new campground page was just made to the server'); 
    res.render('newcampground');
});



//details of one campground, GET request route
app.get('/campgrounds/:id', function(req, res){
    if(helpDebug)console.log('A GET Request to view a specific campground page was just made to the server'); 
    //find the campground associated to the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        //The callback function
        if(err){
            console.log(err)
        }else{
            //render show template with that ID
            res.render('show', {campground: foundCampground});
        }
        
    })
    
    // res.send('This will be the show page one day');
});



//Catch all route, default route for unhandled GET requests
app.get('*', function(req, res){
    if(helpDebug)console.log('An unhandled GET Request was just made to the server'); 
    res.render('default');
});
app.get('/camp')



/////////////Starting the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('YelpCamp Server has started!'); 
});




