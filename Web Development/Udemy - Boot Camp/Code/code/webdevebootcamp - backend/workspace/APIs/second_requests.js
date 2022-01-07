//Shorter more compact version of the recipe
var request = require('request');
request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body){
  if((!error) && (response.statusCode === 200)){
        console.log('Everything went smoothly!!!');
        console.log(body);
        var parsedBody = JSON.parse(body);
        console.log(parsedBody);
        console.log(parsedBody['company']['catchPhrase']);
  } 
  else{
        console.log('Something went Wrong!!');
        console.log(error);
        console.log(response);
  }
});