let mysql = require('mysql');
let config = require('./config.js');
 
let connection = mysql.createConnection(config);

console.log(config.password)

let sql = `CALL getClients(?)`;
 
connection.query(sql, 5, (error, results, fields) => { //the parameter after sql is the stored function's first input
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);
});
 
connection.end();