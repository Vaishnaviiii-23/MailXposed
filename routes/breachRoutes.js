const express = require('express');
const router = express.Router();
const db = require('../server/db');

// Get all breached data
router.get('/breaches', (req, res) => {
  db.query('SELECT * FROM breaches', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Check if email was breached
router.get('/check', (req, res) => {
  const { email } = req.query;
  db.query('SELECT * FROM breaches WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      breached: results.length > 0,
      data: results
    });
  });
});

module.exports = router;
