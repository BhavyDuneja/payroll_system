// src/Login.js
import React, { useState } from 'react';
import '../style/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Allows cookies/session
        body: JSON.stringify({ identifier: username, password, remember }), // Use identifier instead of username
      });
  
      if (response.ok) {
        const data = await response.json();
        if (!remember) {
          localStorage.setItem('token', data.token);
        }
        
        switch (data.role) {
          case 'admin':
            window.location.href = '/admin';
            break;
          case 'hr':
            window.location.href = '/hr';
            break;
          default:
            window.location.href = '/employee';
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid login credentials!');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>PayrollPro</h2>
        <p>Login</p>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
