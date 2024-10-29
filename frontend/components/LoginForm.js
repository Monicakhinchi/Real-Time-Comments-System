// frontend/components/LoginForm.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
      });
      const { sessionId } = response.data;
      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('username', username);
      router.push('/comments');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
