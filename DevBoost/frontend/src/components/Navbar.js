import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">DevBoard</div>
        <div className="flex items-center gap-6">
          <span className="text-slate-300">{user?.name}</span>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
