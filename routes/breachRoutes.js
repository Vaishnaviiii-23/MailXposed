const express = require('express');
const router = express.Router();
const db = require('../db');

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
// Check all emails under a domain
router.get('/check-domain', (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  const query = 'SELECT email, source FROM breaches WHERE email LIKE ?';
  db.query(query, [`%@${domain}`], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      breachedAccounts: results
    });
  });
});

module.exports = router;
