'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const socket = io('http://localhost:5000');

const CommentsPage = () => {
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        socket.emit('fetchComments');
        
        socket.on('comments', (initialComments) => {
            setComments(initialComments);
        });

        socket.on('newComment', (newComment) => {
            setComments((prevComments) => [newComment, ...prevComments]);
        });

        return () => {
            socket.off('comments');
            socket.off('newComment');
        };
    }, []);

    const handlePost = () => {
        if (username && comment) {
            const newComment = { username, comment };
            socket.emit('postComment', newComment);
            
            setComment('');
        } else {
            alert('Please enter a username and a comment.');
        }
    };

    return (
        <Container>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                    style: { color: 'white' },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                }}
            />
            <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                margin="normal"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                    style: { color: 'white' },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                }}
            />
            <Button variant="contained" color="primary" onClick={handlePost}>
                Post Comment
            </Button>
            <List>
                {comments.map((c) => (
                    <ListItem key={c.id}>
                        <ListItemText
                            primary={<span style={{ color: 'white' }}>{c.username}: {c.comment}</span>}
                            secondary={<span style={{ color: 'lightgray' }}>{new Date(c.timestamp).toLocaleString()}</span>}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default CommentsPage;
