import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:4000/auth/login',
        {username, password, },
        { withCredentials: true }
      );
      login(res.data.username);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-20">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <button className="w-full bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};
