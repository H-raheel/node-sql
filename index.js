const express = require('express');
const app = express();

app.use(express.json());

const dbPromise = require('./db');

dbPromise.then(db => {
  // Create table after DB connection is ready
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `).then(() => {
    console.log('Users table is ready');
  }).catch(err => {
    console.error('Failed to create table:', err);
    process.exit(1);
  });

  app.post('/add', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO users (name) VALUES (?)', [name])
      .then(() => res.send('User added'))
      .catch(err => res.status(500).send(err));
  });

  app.get('/', (req, res) => {
    res.send('App is running!');
  });

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to initialize DB:', err);
});
