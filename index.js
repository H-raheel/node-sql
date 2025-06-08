const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// ✅ Create table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Failed to create table:', err);
    process.exit(1);
  }
  console.log('Users table is ready');
});

app.post('/add', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User added');
  });
});

app.get('/', (req, res) => {
  res.send('App is running!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
