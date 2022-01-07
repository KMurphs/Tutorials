var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')
var helpDebug  = true
var middleware = require('../middleware') //automatically goes for index.js, since no file is specififed




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
router.get('/new', middleware.isLoggedIn, function(req, res){
    if(helpDebug)console.log('A GET Request to the new campground page was just made to the server'); 
    res.render('campgrounds/newcampground');
});


//campgrounds Page POST request route
router.post('/', middleware.isLoggedIn, function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var new_camp = { name: req.body.name, 
                    image: req.body.image, 
                    author: author, 
                    description: req.body.description};

    Campground.create(new_camp, function(err, newlyCreated){
        if(err){
            console.log('Error while adding campground entry')
            req.flash("error", "Error while adding campground entry")
            res.redirect('back');  
        }else{
            if(helpDebug)console.log('A POST Request to the CampGrounds Page was just made to the server'); 
            req.flash("success", "Successfully added new Campground")
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







//edit campgrounds Page GET request route
router.get('/:id/edit', middleware.isLoggedIn, middleware.isOriginalAuthor_Campground, function(req, res){
    Campground.findById(req.params.id, function(err, foundEntry){
        if(err){
            console.log('Error retrieving campground details')
            console.log(err)
        }else{
            if(helpDebug)console.log('A GET Request to the edit campground page was just made to the server'); 
            console.log(foundEntry)
            res.render('campgrounds/edit', {campground: foundEntry});            
        }
    })
});


//submit edited campground PUT request route
router.put('/:id', middleware.isLoggedIn, middleware.isOriginalAuthor_Campground, function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var updatedCamp = { name: req.body.name, 
                        image: req.body.image, 
                        author: author, 
                        description: req.body.description};

    Campground.findByIdAndUpdate(req.params.id, updatedCamp, function(err, updatedCamp){
        if(err){
            console.log('Error while updating campground entry')
            req.flash("error", "Error while updating campground entry")
            res.redirect('back'); 
        }else{
            if(helpDebug)console.log('A PUT Request to update a CampGround was just made to the server'); 
            req.flash("success", "Successfully updated Campground")
            res.redirect('/campgrounds/' + req.params.id);          
        }
    })
});



//Destroy campground DELETE request route
router.delete('/:id', middleware.isLoggedIn, middleware.isOriginalAuthor_Campground, function(req, res){
    console.log('Deleting Campground')
    Campground.findByIdAndRemove(req.params.id, function(err, updatedCamp){
        if(err){
            console.log('Error while deleting campground entry')
            req.flash("error", "Error while deleting campground entry")
            res.redirect('back');   
        }else{
            if(helpDebug)console.log('A DELETE Request to update a CampGround was just made to the server'); 
            req.flash("success", "Successfully deleted Campground")
            res.redirect('/campgrounds');          
        }
    })
});











module.exports = router