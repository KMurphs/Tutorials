var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var friends = ["Tony", "Miranda", "Justine", "Pierre", "Lily"];

app.get("/", function(req, res){
    console.log("GET Request to Home Page was just made");
    res.render("home");
});


app.get("/friends", function(req, res){
    
    console.log("GET Request to Friends Page was just made");
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    console.log("A POST Request to add a friend was made");
    console.log(req.body); 
    //req.body is created automatically we need to add a package 
    // that will do that for us (req.body just printed undefined
    // in the console log). The new package is: body-parser
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // res.send("You have reached the post route");
    res.redirect("/friends"); //To display the new updaed list f friends
});

app.get("*", function(req, res){
    console.log("An unsupported GET Request was made");
    res.send("Sorry, the page request does not exists");
});


app.listen(process.env.PORT, process.env. IP, function(){
    console.log("Server is listening");
});