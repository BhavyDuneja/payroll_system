// db.js

const mysql = require('mysql');

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',       // Replace with your MySQL host
  user: 'root',            // Replace with your MySQL user
  password: 'Tech_123',     // Replace with your MySQL password
  database: 'case2'         // Database created for the employee table
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

module.exports = db;
