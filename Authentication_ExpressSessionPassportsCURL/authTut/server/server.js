//npm modules
const express = require('express');

// create the server
const app = express();

// tell the server what port to listen on
app.listen(3001, () => {
  console.log('Listening on localhost:3001')
})