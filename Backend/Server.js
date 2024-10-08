// Import necessary packages
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');

// Create an Express app
const app = express();
const PORT = 3000; // You can change the port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
}));

// MySQL Database Connection
const db = mysql.createConnection({
  host: 's2smsdatabase.cvme0g0k6zs6.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Taknev321$',
  database:'s2sms'

});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Admin login endpoint

//Api for Student login
app.post('/s2admin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = 'SELECT * FROM s2admin WHERE email = ?';

  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (data.length > 0) {
      const student = data[0];
        if (student.password === password) {
          req.session.email = email;
          res.json({ status: "Success" });
        } else {
          res.status(400).json({ message: "Password not matched" });
        }
    } else {
      res.status(400).json({ message: "Email not exists" });
    }
  });
});

// Define a GET endpoint to retrieve data from the s2services table
app.get('/ServicesDetails', (req, res) => {
  const query = 'SELECT * FROM s2services';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Failed to fetch data from s2services' });
    } else {
      res.json(results);
    }
  });
});


// GET route to fetch all customer details from the `s2customer` table
app.get('/CustomerDetails', (req, res) => {
  const query = 'SELECT * FROM s2customer';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Server error while fetching customer details.' });
    }

    // Send back the customer details
    res.status(200).json(results);
  });
});
// API endpoint to get all technician details
app.get('/gettechnicians', (req, res) => {
  const query = 'SELECT * FROM s2technician';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching technician details:', err.message);
      return res.status(500).json({ error: 'Failed to load technician details' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
