// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const username = req.body.username;
  const sessionId = `session_${new Date().getTime()}`;
  res.json({ sessionId });
});

module.exports = router;
