# [Stored Procedure](http://www.mysqltutorial.org/mysql-nodejs/call-stored-procedures/)

## Setting Up

An example of a stored procedure is given below

```
USE `test_schema`;
DROP procedure IF EXISTS `getClients`;

DELIMITER $$
USE `test_schema`$$
CREATE DEFINER=`tester`@`127.0.0.1` PROCEDURE `getClients`(IN size INTEGER)
BEGIN
	SELECT * FROM test_schema.clients_table LIMIT size;
END$$

DELIMITER ;
```

The stored procedure has thte name `getClients`
From `MYSQL` execute the query ``CALL getClients()`` to use the stored procedure

Note that the user must have `EXECUTE` rights on the database

## From Node

First, the content of `main.js`
```
let mysql = require('mysql');
let config = require('./config.js');
 
let connection = mysql.createConnection(config);
 
let sql = `CALL filterTodo(?)`;
 
connection.query(sql, 10, (error, results, fields) => { 
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);
});
 
connection.end();
```

Also, from `config.js`
```
let config = {
  host    : 'localhost',
  user    : 'root',
  password: process.ENV.MYSQL_ROOT_PASSWORD,
  database: 'test_schema'
};
 
module.exports = config;
```

Run ``npm start`` or ``node main.js``