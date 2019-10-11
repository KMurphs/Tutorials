let config = {
  host    : '127.0.0.1',
  port: 3306,
  user    : 'tester',
  password: (process.env.MYSQL_DB_PASSWORD) ? process.env.MYSQL_DB_PASSWORD : "Tester321!",
  database: 'test_schema'
};
 
module.exports = config;