var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')
var helpDebug  = true
// =============================================================
//                       SERVER ROUTES
// =============================================================




//campgrounds Page GET request route
router.get('/', function(req, res){
    if(helpDebug)console.log('A GET Request to the CampGrounds Page was just made to the server'); 
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err)
        }else{
            console.log(allcampgrounds)
            res.render('campgrounds/index'/*the ejs file*/, {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});






//new campgrounds Page GET request route
router.get('/new', function(req, res){
    if(helpDebug)console.log('A GET Request to the new campground page was just made to the server'); 
    res.render('campgrounds/newcampground');
});






//campgrounds Page POST request route
router.post('/', function(req, res){
    // var ParsedData = bodyParser(req);
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






//details of one campground, GET request route
router.get('/:id', function(req, res){
    if(helpDebug)console.log('A GET Request to view a specific campground page was just made to the server'); 
    //find the campground associated to the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        //The callback function
        if(err){
            console.log(err)
        }else{
            //render show template with that ID
            console.log(foundCampground._id)
            res.render('campgrounds/show', {campground: foundCampground});
        }
        
    })
    
    // res.send('This will be the show page one day');
});


module.exports = router