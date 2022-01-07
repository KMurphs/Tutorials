// Setting up the enviroment
var express         = require("express"),
    bodyParser      = require("body-parser"),
    request         = require('request'),
    helpDebug       = true,
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    methodOverrride = require('method-override'),
    app             = express(),
    User            = require('./models/user'),
    Campground      = require('./models/campground'),
    seedDB          = require('./seeds'),
    Comment         = require('./models/comment')
    
var commentRoutes         = require('./routes/comments'),
    campgroundsRoutes     = require('./routes/campgrounds'),
    indexRoutes           = require('./routes/index')
   
   
   
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverrride("_method"));

// seedDB();

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

app.use("/",indexRoutes)
app.use("/campgrounds", campgroundsRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)



//Catch all route, default route for unhandled GET requests
app.get('*', function(req, res){
    if(helpDebug)console.log('An unhandled GET Request was just made to the server'); 
    res.render('default');
});

/////////////Starting the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('YelpCamp Server has started!'); 
});




