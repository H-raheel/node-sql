const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

async function initializeDB() {
  try {
    // Step 1: connect without database to create DB if not exists
    const initialConn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
    });

    await initialConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await initialConn.end();

    // Step 2: connect with DB_NAME specified
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    console.log(`Connected to MySQL database '${DB_NAME}'.`);

    return db;
  } catch (err) {
    console.error('DB initialization failed:', err);
    process.exit(1);
  }
}

module.exports = initializeDB();
