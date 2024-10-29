// frontend/components/PostComment.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const PostComment = ({ onCommentPosted }) => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    const handlePost = async () => {
        if (username && comment) {
            try {
                const response = await axios.post('http://localhost:5000/api/comments', { username, comment });
                setComment('');
                socket.emit('newComment', response.data); // Emit to socket
                onCommentPosted(response.data); // Callback for updating the comment list
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    return (
        <div>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                margin="normal"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handlePost}>
                Post Comment
            </Button>
        </div>
    );
};

export default PostComment;
