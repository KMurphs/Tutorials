// Setting up the enviroment
var express         = require("express"),
    bodyParser      = require("body-parser"),
    request         = require('request'),
    helpDebug       = true,
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    app             = express(),
    User            = require('./models/user'),
    Campground      = require('./models/campground'),
    seedDB          = require('./seeds'),
    Comment         = require('./models/comment')
    
   
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

seedDB();

mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true}); //Connects to (and create the db)


//PASSPORT Configuration
app.use(require('express-session')({
    secret: "this is again used for session decoding and encoding",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




// =============================================================
//                       Utilities
// =============================================================

app.use(function(req, res, next){
    //Basically, all the app use are middleware functions called
    //between when the req is received and when the handle is called
    //ensure that next is always called
    
    //Everything that's available in the template is contained locals
    //this is done behind the scenes
    res.locals.currentUser = req.user 
    next();
})


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}




// =============================================================
//                       SERVER ROUTES
// =============================================================


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
            console.log(allcampgrounds)
            res.render('campgrounds/index'/*the ejs file*/, {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});






//new campgrounds Page GET request route
app.get('/campgrounds/new', function(req, res){
    if(helpDebug)console.log('A GET Request to the new campground page was just made to the server'); 
    res.render('campgrounds/newcampground');
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






//details of one campground, GET request route
app.get('/campgrounds/:id', function(req, res){
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




// =============================================================
//                       COMMENTS ROUTES
// =============================================================
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log('Error while trying to retrieve campground info')
        }else{
            console.log(campground)
            console.log(req.params.id)
            if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
            res.render('comments/new', {campground: campground})            
        }
    })
})

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
    var ParsedData = bodyParser(req);
    console.log(req.body);
    var new_comment = {text: req.body.comment.content, author: req.body.comment.author};
    console.log(new_comment);
    
    //Create a new campground and add to db
    Comment.create(new_comment, function(err, newlyCreated){
        if(err){
            console.log('Error while adding campground entry')
        }else{
            if(helpDebug)console.log('A POST Request to the CampGrounds Page was just made to the server'); 
            Campground.findById(req.params.id, function(err, campground){
                if(err){
                    console.log('Error while trying to retrieve campground info')
                }else{
                    campground.comments.push(newlyCreated)
                    campground.save()
                    if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
                    res.redirect('/campgrounds/' + req.params.id);          
                }   
            })
        }
    })
})



// =============================================================
//                       Authentication ROUTES
// =============================================================

//SHOW Register FORM
app.get('/register', function(req, res){
    res.render('register')
})


//Do Register FORM
app.post('/register', function(req, res){
    
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
app.get('/login', function(req, res){
    res.render('login')
})


//Do Login 
app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
    
})


//logout route
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds')
})







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




