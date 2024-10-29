// frontend/pages/comments.js
import React from 'react';
import CommentsList from '../components/CommentsList';
import PostComment from '../components/PostComment';
import { Container, Typography } from '@mui/material';

const CommentsPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" sx={{ mt: 4 }}>
        Real-Time Comments
      </Typography>
      <PostComment />
      <CommentsList />
    </Container>
  );
};

export default CommentsPage;
