//Simplified http request from github.com/request
//https://github.com/request/request

//Code From the github page
// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


// //Shorter more compact version of the recipe
// var request = require('request');
// request('http://www.google.com', function(error, response, body){
//   if((!error) && (response.statusCode === 200)){
//         console.log('Everything went smoothly!!!');
//         console.log(body);
//   } 
//   else{
//         console.log('Something went Wrong!!');
//         console.log(error);
//         console.log(response);
//   }
// });


var request = require('request');
request('http://www.google.com', function(error, response, body){
   if(error){
       console.log('Something went Wrong!!');
       console.log(error);
   } 
   else{
       if(response.statusCode === 200){
           console.log('Everything went smoothly!!!');
           console.log(body);
       }
   }
});