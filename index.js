const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Domain-based email breach check
app.get('/api/check-domain', (req, res) => {
  const domain = req.query.domain;
  console.log("Incoming domain query:", domain);

  if (!domain) {
    return res.status(400).json({ message: 'Domain is required' });
  }

  const query = 'SELECT * FROM breaches WHERE email LIKE ?';
  pool.query(query, [`%@${domain}`], (err, results) => {
    if (err) {
      console.error('Error fetching domain breaches:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({
      domain: domain,
      totalBreachedEmails: results.length,
      breachedAccounts: results
    });
  });
});

// ✅ POST to add breach
app.post('/api/breaches', (req, res) => {
  const { email, password, source } = req.body;

  if (!email || !source) {
    return res.status(400).json({ message: 'Email and source are required.' });
  }

  const query = 'INSERT INTO breaches (email, password, source) VALUES (?, ?, ?)';
  pool.query(query, [email, password, source], (err, result) => {
    if (err) {
      console.error('Error inserting breach:', err);
      return res.status(500).json({ message: 'Database insert error' });
    }

    res.status(201).json({ message: 'Breach added successfully', breachId: result.insertId });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
