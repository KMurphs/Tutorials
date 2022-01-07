// Setting up the enviroment
var express    = require("express"),
    bodyParser = require("body-parser"),
    request    = require('request'),
    helpDebug  = true,
    mongoose   = require('mongoose'),
    app = express(),
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    Comment = require('./models/comment')
    
   
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

seedDB();

mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true}); //Connects to (and create the db)





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
            console.log(allcampgrounds)
            res.render('campgrounds/index'/*the ejs file*/, {campgrounds: allcampgrounds});
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
app.get('/campgrounds/:id/comments/new', function(req, res){
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

app.post('/campgrounds/:id/comments', function(req, res){
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




