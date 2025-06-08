const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin1234',
  database: process.env.DB_NAME || 'mydb'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
