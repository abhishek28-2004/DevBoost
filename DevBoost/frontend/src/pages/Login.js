import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login({ setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">DevBoard</h1>
        <p className="text-slate-400 mb-6">Developer Productivity OS</p>
        {error && <p className="bg-red-900 text-red-100 p-3 rounded mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mb-4">
            Login
          </button>
        </form>
        <p className="text-center text-slate-400">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
