// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Assuming you have a db.js file that sets up the MySQL connection
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // The URL of your React app
  credentials: true, // Allow cookies and credentials to be passed in
}));

app.use(bodyParser.json());
// Import auth routes
const authRoutes = require('./auth');
// Use auth routes
app.use('/api/auth', authRoutes);
// Root Route - Respond to GET requests on '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Payroll API');
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
