var express = require("express");
var app = express();

// This instruct express to look for files in the public directory 
// in this folder. Therefore our external css files or js files can be 
// located there and accessed by all projects in this directory.
// Also, we don't need to specify path to the buclic directory when we 
// link our sheets and scripts
app.use(express.static(__dirname + '/public')); //server public directory
app.set("view engine", "ejs"); //use ejs extension for views



app.get("/", function(req, res){
    // res.send("Welcome to the home page!");
    res.render("home.ejs");// embedded javascript 
    //with render The file will be first searched in the views doirectory that need to be created 
});// res.render also send just like res.send

app.get("/fallinlove/:thing", function(req, res){
    var thing = req.params.thing;
    // res.send("Welcome to the home page!");
    // res.send("You fell in love with " + thing);// embedded javascript
    res.render("love.ejs", {theThingVar: thing});
});

app.get("/nextstep/post", function(req, res){
    var posts = [
        {title: "My love is so beasutiful", author: "Stephane"},
        {title: "Ans she is so wonderful", author: "Stephane Again"},
        {title: "I am deeply in love with you", author: "Celine"}
        ];
    console.log("A Request was made at /nextstep/post");
    res.render("posts.ejs", {posts: posts}); 
    // res.send("I am here"); 
});

app.get("/nextstep/styling", function(req, res){
    var posts = [
        {title: "My love is so beasutiful", author: "Stephane"},
        {title: "Ans she is so wonderful", author: "Stephane Again"},
        {title: "I am deeply in love with you", author: "Celine"}
        ];
    console.log("A Request was made at /nextstep/styling");
    // res.render("styling.ejs", {posts: posts}); 
    
    // can drop the ejs extension because of the line
    // app.set("view engine", "ejs");
    res.render("styling", {posts: posts}); 
    
    // res.send("I am here"); 
});

app.get("/nextstep/aCompleteHTML", function(req, res){
    var posts = [
        {title: "My love is so beasutiful", author: "Stephane"},
        {title: "Ans she is so wonderful", author: "Stephane Again"},
        {title: "I am deeply in love with you", author: "Celine"}
        ];
    console.log("A Request was made at /nextstep/styling");
    // res.render("styling.ejs", {posts: posts}); 
    
    // can drop the ejs extension because of the line
    // app.set("view engine", "ejs");
    res.render("aCompleteHTML", {posts: posts}); 
    
    // res.send("I am here"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!");
});