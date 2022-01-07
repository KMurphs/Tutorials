var express                 = require('express'),
    app                     = express(),
    mongoose                = require('mongoose'),
    bodyParser              = require('body-parser'),
    passport                = require('passport'),
    localStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    User                    = require('./models/user');
 
 
mongoose.connect('mongodb://localhost/auth_demo_app')
 
 
    
app.set('view engine', 'ejs')
app.use(require('express-session')({
    secret: "This is a token used during decoding and encoding of sessions data",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) //These 2 lines are required, if passport is to be used - Intergation
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: true}))


//We are using a new local authentication strategy defined
// as user.authenticate which was imported via
// UserSchema.plugin(passportLocalMongoose);
passport.use(new localStrategy(User.authenticate()))
//User.serializeUser and deserializeUser come from passportLocalMongoose and are imported in
//the user compiled schema-model via UserSchema.plugin(passportLocalMongoose);
//Here we are saying that passport should use these methods
passport.serializeUser(User.serializeUser()) //read session data and encode
passport.deserializeUser(User.deserializeUser()) //read session data and decode



//===================================================
//                     Utilitites
//===================================================


//This is a middleware we are creating
//Node knows what to call in "next", the next function
// in the list of middleware, and if there none, the handle
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

//===================================================
//                     ROUTES
//===================================================

app.get('/', function(req, res){
    res.render('home')
})

app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret')
})


app.get('/register', function(req, res){
    res.render('register')
})

app.post('/register', function(req, res){
    console.log(req.body)
    User.register(new User({username: req.body.user.name}), req.body.user.password, function(err, user){
        if(err){
            console.log('Error registering user')
            console.log(err)
            res.render('register')
        }else{
            console.log(user)
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secret')
            })
        }
    })
})



app.get('/login', function(req, res){
    res.render('login')
})


//The function or functions in between the route and
// the handle (last function) are called middleware.
// These middleware are functions called before the handle
app.post('/login',passport.authenticate('local', {
    //Note that this middleware does not ask for password
    //from the request. It requires the form to standardized
    //user field name must be username
    //password field name must be password of type passwrd.. duh!
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res){

})


app.get('/logout', function(req, res){
    req.logout() //logging out of the session
    res.redirect('/')
});







app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Authentication Server Project started')
})