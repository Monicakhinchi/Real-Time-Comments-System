// server.js or index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mkhinchi786$', // replace with your MySQL password
    database: 'comments_db', // replace with your MySQL database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', // Update with your frontend URL
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send all comments when a client connects
    socket.on('fetchComments', () => {
        db.query('SELECT * FROM comments ORDER BY timestamp DESC', (err, results) => {
            if (err) {
                console.error('Error fetching comments:', err);
            } else {
                socket.emit('comments', results);
            }
        });
    });

    // Handle posting of a new comment
    socket.on('postComment', (newComment) => {
        const { username, comment } = newComment;
        db.query('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment], (err, result) => {
            if (err) {
                console.error('Error posting comment:', err);
            } else {
                const commentWithId = { id: result.insertId, ...newComment, timestamp: new Date() };
                io.emit('newComment', commentWithId); // Broadcast new comment to all clients
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
