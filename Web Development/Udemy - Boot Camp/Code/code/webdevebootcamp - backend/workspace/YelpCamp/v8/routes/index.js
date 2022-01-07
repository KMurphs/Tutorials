var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')
var passport   = require('passport')
var User       = require('../models/user')
var helpDebug  = true


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}



//Home Page GET request route
router.get('/', function(req, res){
    if(helpDebug)console.log('A GET Request to the Home Page was just made to the server'); 
    res.render('home');
});


// =============================================================
//                       Authentication ROUTES
// =============================================================

//SHOW Register FORM
router.get('/register', function(req, res){
    res.render('register')
})


//Do Register FORM
router.post('/register', function(req, res){
    
    var newUser = new User({username: req.body.username}) 
    // User.register() is provided by passport mongoose
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log('Error Registering User')
            console.log(err)
            return res.render('register')
        }
        
        passport.authenticate('local')(req, res, function(){
            console.log('inside the POST Route - Authenticated')
            res.redirect('/campgrounds')
        })
    })
})




//SHOW Login FORM
router.get('/login', function(req, res){
    res.render('login')
})


//Do Login 
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
    
})


//logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds')
})


// router.get('/camp')

module.exports = router