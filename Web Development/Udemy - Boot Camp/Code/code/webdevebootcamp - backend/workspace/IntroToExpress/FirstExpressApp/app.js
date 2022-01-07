console.log("connected");

var express =require("express");
var app = express();

// create a route for get on "/" page (root page)
app.get("/", function(req, res){ //request and response
    console.log("A request was just made at //")
   res.send("Hi There"); 
});

app.get("/bye", function(req, res){
    console.log("A request was just made at //bye")
    res.send("Good Bye!!");    
});

app.get("/cats", function(req, res){
    console.log("A request was just made at //cats")
   res.send("MEOW!!"); 
});

app.get("/dogs", function(req, res){
    console.log("A request was just made at //cats")
   res.send("WHOU!!"); 
});

//use the ":" as with path varibles? to indicate that anyting there
//is acceptable and should be handled here
// celine/mylove
// celine/monsucre
// celine/tumenerveparfois
//All of those fall into this category
// This also means that the request gets parsed and the
// value of someOtherName is saved in teh req object
//req.params
app.get("/Celine/:someOtherName", function(req, res){
    console.log("A request was just made at a url that matches /Celine/someOtherName")
    console.log(req.params);
   res.send("hey beautiful!!"); 
});


app.get("/Celine/:someOtherName/comment/:aComment", function(req, res){
    console.log("A request was just made at a url that matches /Celine/someOtherName")
    console.log(req.params);
    console.log(req.params.someOtherName);
   res.send("hey awesomely beautiful!!"); 
});


//Order of routes matter! The first route tht matches 
//the request is the on that gets run, the other ones are
//discarded. So if the follwing route was inserted
// before all the other ones, none of them would ever be
//executed.
//This one is a catch all route, especially useful when
// trying to catch anything funky that a user might do but shouldnd.t
app.get("*", function(req, res){
    console.log("A request was just made at something unknown")
   res.send("<p>you are a star?!!<p>"); 
});



// instruct the server to start listen on some specific port and Ip, that
// we will use to talk to our server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!")
});