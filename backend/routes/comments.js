const express = require('express');
const router = express.Router();

// Export the router with connection as an argument
module.exports = (connection) => {
  // GET all comments
  router.get('/', async (req, res) => {
    try {
      const [comments] = await connection.execute('SELECT * FROM comments ORDER BY timestamp DESC');
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      res.status(500).json({ message: error.message });
    }
  });

  // POST a new comment
  router.post('/', async (req, res) => {
    const { username, comment } = req.body;

    // Validate input
    if (!username || !comment) {
      return res.status(400).json({ message: 'Username and comment are required' });
    }

    try {
      const [result] = await connection.execute('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment]);
      const newComment = { id: result.insertId, username, comment, timestamp: new Date() };
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error inserting comment:', error.message);
      res.status(500).json({ message: error.message });
    }
  });

  return router; // Return the router
};
