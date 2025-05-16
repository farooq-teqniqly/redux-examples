import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    try {
      await new Promise(res => setTimeout(res, 500));
      if (username === 'admin' && password === 'secret') {
        dispatch(loginSuccess({ token: 'demo-token', user: { name: 'Admin' } }));
        navigate('/categories');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
