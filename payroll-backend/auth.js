// auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Assuming db.js contains the MySQL connection

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // Move this to an environment variable in production

// Login Route
router.post('/login', (req, res) => {
  const { identifier, password, remember } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Please provide identifier and password' });
  }

  // SQL query to check for email, first name, or phone number
  const query = `
    SELECT * FROM employee 
    WHERE email = ? OR first_name = ? OR phone = ?
  `;

  db.query(query, [identifier, identifier, identifier], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid identifier or password', error: 'No user found with the provided identifier' });
    }

    const user = results[0];

    // Compare input password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid identifier or password', error: 'Error comparing password: ' + err.message });
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid identifier or password', error: 'Password does not match' });
      }

      // If password matches, generate JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: remember ? '21d' : '8h' // 3 weeks if 'remember me' is checked, otherwise 8 hours
      });

      res.json({ message: 'Login successful', token, role: user.role });
    });
  });
});

module.exports = router;
