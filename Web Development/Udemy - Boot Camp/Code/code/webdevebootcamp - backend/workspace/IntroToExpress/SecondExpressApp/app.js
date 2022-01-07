var express = require("express");
var app = express();

//First request to /
app.get("/", function(req, res){
    console.log("Request to main page was made");
    res.send("<p>Hi there welcome to my assignment</p>");
});

//First request to /speak domain
app.get("/speak/:anAnimal", function(req, res){
    console.log("Request to the speak domain was made");
    var anAnimalNoise = "";
    
    switch(req.params.anAnimal.toLowerCase()) {
        case "pig":
            anAnimalNoise = 'Oink';
            break;
        case "cow":
            anAnimalNoise = 'Moo';
            break;
        case "dog":
            anAnimalNoise = 'Woof Woof!';
            break;
        default:
            anAnimalNoise = 'Unkown';
    } 
    
    res.send("<p>The " + req.params.anAnimal + " says '" + anAnimalNoise + "'</p>");
});


//First request to /repeat domain
app.get("/repeat/:aPhrase/:aNumberOfTime", function(req, res){
    console.log("Request to the repeat domain was made");

    var content = ""; 
    for(var i = 0; i < Number(req.params.aNumberOfTime); i++)
        content = content + req.params.aPhrase + " ";
        
    res.send("<p>Our response is: '" + content + "'</p>");
});


//request to anything
app.get("*", function(req, res){
    console.log("An invalid Request was just made");
    res.send("<p>Sorry, page not found... What are you doing with your life?</p>");
});


//start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});