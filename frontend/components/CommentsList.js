// frontend/components/CommentsList.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const CommentsList = ({ comments }) => {
    return (
        <List>
            {comments.map((comment) => (
                <ListItem key={comment._id}>
                    <ListItemText primary={`${comment.username}: ${comment.comment}`} secondary={new Date(comment.timestamp).toLocaleString()} />
                </ListItem>
            ))}
        </List>
    );
};

export default CommentsList;
