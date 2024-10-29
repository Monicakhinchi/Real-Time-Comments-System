// app/components/Comments.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments'); // Adjust the URL if needed
      setComments(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.username}</strong>: {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
