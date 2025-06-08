const mysql = require('mysql2');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

// Step 1: Connect without a database
const initialConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
});

initialConnection.connect(err => {
  if (err) {
    console.error('Initial DB connection failed:', err);
    process.exit(1);
  }

  console.log('Connected to MySQL server (no DB yet).');

  // Step 2: Create DB if it doesn't exist
  initialConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`, (err) => {
    if (err) {
      console.error(`Error creating database '${DB_NAME}':`, err);
      process.exit(1);
    }

    console.log(`Database '${DB_NAME}' is ready.`);

    // Step 3: Connect with the actual DB
    const db = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    db.connect(err => {
      if (err) {
        console.error(`Failed to connect to '${DB_NAME}':`, err);
        process.exit(1);
      }

      console.log(`Connected to MySQL database '${DB_NAME}'.`);
      module.exports = db;
    });
  });

  initialConnection.end(); // close initial connection
});
