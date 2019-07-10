//importing node framework
var express = require("express");

console.log(process.env.NODE_ENV)
//others coding
if(process.env.NODE_ENV == "production")
{
	process.env.PORT = 3000
  //useblabla log level.
  //use production log.
}
else// if(process.env.NODE_ENV === "development")
{
	process.env.PORT = 3005
  //useblabla log level.
  //use development log.

}
 
var app = express();
//Respond with "hello world" for requests that hit our root "/"
app.get("/", function (req, res) {
 res.send("hello world");
});
//listen to port 3000 by default
app.listen(process.env.PORT || 3000, function(){
	console.log("Server listening on port: " + process.env.PORT)
});
 
module.exports = app;