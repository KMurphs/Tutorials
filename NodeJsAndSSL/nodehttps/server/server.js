const app = require('express')();
const https = require('https');
const fs = require('fs');

//GET home route
app.get('/', (req, res) => {
	console.log('You hit the home page')
     res.send('Hello World');
});

const options = {
  key: fs.readFileSync('./hostkey.pem'),
  cert: fs.readFileSync('./hostcert.pem')
};

https.createServer(options, app).listen(3000, ()=>{
	console.log('Listening on localhost:3000')
});
