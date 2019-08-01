const axios = require('axios');
const https = require('https');
const fs = require('fs');









////////////////////////////////////////
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false,
  key: fs.readFileSync('../server/hostkey.pem'),
  cert: fs.readFileSync('../server/hostcert.pem'),
  agent: false
};

const req = https.request(options, (res) => {
  console.log("using normal https lib");
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    
    console.log(d);
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();



///////////////////////////////////////
var instance = axios.create({
  baseURL: 'https://localhost:3000',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    key: fs.readFileSync('../server/hostkey.pem'),
    cert: fs.readFileSync('../server/hostcert.pem'),
  }),
  auth: {
    username: 'username',
    password: 'password'
  }
});

instance.get('/')
    .then(res => {
      // console.log(res)
      // console.log("-------------------------------")
      console.log("\n\nUsing axios")
      console.log('status:', res.status);
      console.log('headers:', res.headers);
      console.log(res.data)
    })
    .catch(err => console.log(`error: ${err.stack}`));