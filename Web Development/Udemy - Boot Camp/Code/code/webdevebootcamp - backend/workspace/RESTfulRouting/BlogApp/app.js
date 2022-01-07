var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer')
    

//APP Config
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
//Basically, methodOverride will listen to all incoming requests for
//the token '_method', and once it finds a request with that token, 
//it will alter the original route of the request to go through
//the route specified after the '_method=' token
app.use(expressSanitizer())//needs to exist after the body parser line


//Mondoose/Model Config
mongoose.connect('mongodb://localhost:27017/blogapp', { useNewUrlParser: true })
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})
var blog = mongoose.model('blog', blogSchema) //Compilte schema into model


// blog.create({
//     title: "My First Entry",
//     image: "https://images.unsplash.com/photo-1556310917-bfbbc8f73639?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
//     body: "this is my first entry and I am so excited!!!",
// })


//Good practice to redirect GET requests to the home page the index route
app.get('/', function(req, res){
    res.redirect('/blogs');    
}) 


//RESTful Routing: INDEX Route
app.get('/blogs', function(req, res){
    blog.find({}, function(err, dbBlogs){
        if(err){
            console.log('Error retrieving blogs from DB')
        }else{
            console.log(dbBlogs)
            res.render('index', {dbBlogs: dbBlogs});
        }
    })
})


//RESTful Routing: NEW 
app.get('/blogs/new', function(req, res){
    res.render('new')
})


//RESTful Routing: CREATE
app.post('/blogs', function(req, res){
    //create blog, add to db
    req.body.blog.body = req.sanitize(req.body.blog.body)
    blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new')
        }else{
            //redirect to index page
            res.redirect('/blogs')
        }
    })
})


//RESTful Routing: SHOW
app.get('/blogs/:id', function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log('Error while retrieving the requested blog')
        }else{
            res.render('show', {blog: foundBlog})
        }
    })
})

//RESTful Routing: EDIT 
app.get('/blogs/:id/edit', function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log('Erro while retrieving Blog Entry')
        }else{
            res.render('edit', {blog:foundBlog})
        }
    })
})

//RESTful Routing: UPDATE
app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log('Erro while updating Blog Entry')
            res.redirect('/blogs')
        }else{
            res.render
            res.redirect('/blogs/' + req.params.id)
        }
    })
})

//RESTful Routing: DELETE Route
app.delete('/blogs/:id', function(req, res){
    blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('Erro while updating Blog Entry')
            res.redirect('/blogs')
        }else{
            res.render
            res.redirect('/blogs')
        }
    })
})




//Catch all route for GET requests
app.get('*', function(req, res){
    console.log('A GET Request to an Unkown Page was made')
    res.render('default')
})


//Start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('BlogApp Server has started')
})