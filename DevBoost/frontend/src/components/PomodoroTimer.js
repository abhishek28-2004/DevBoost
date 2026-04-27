import React, { useState, useEffect } from 'react';
import api from '../api';

export default function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [task, setTask] = useState('');
  const [stats, setStats] = useState({ total: 0, completed: 0, totalMinutes: 0 });

  useEffect(() => {
    fetchTodaysStats();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setIsRunning(false);
          completeSession();
          return 25 * 60;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const fetchTodaysStats = async () => {
    try {
      const { data } = await api.get('/pomodoro/stats/today');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const startSession = async () => {
    try {
      await api.post('/pomodoro/start', { task, duration: 25 });
      setIsRunning(true);
      setTask('');
      fetchTodaysStats();
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const completeSession = async () => {
    // Auto-mark as complete when timer ends
    try {
      await api.get('/pomodoro/stats/today');
    } catch {}
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">🍅 Pomodoro Timer</h2>

      <div className="bg-slate-800 p-8 rounded-lg text-center mb-6">
        <p className="text-5xl font-mono font-bold mb-4">{formatTime(time)}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 rounded font-semibold ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => setTime(25 * 60)} className="btn-secondary">
            Reset
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2"
          disabled={isRunning}
        />
      </div>

      <button onClick={startSession} className="btn-primary w-full mb-6" disabled={isRunning || !task}>
        New Session
      </button>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 p-3 rounded text-center">
          <p className="text-slate-400 text-sm">Total Sessions</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-slate-800 p-3 rounded text-center">
          <p className="text-slate-400 text-sm">Completed</p>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-slate-800 p-3 rounded text-center">
          <p className="text-slate-400 text-sm">Total Minutes</p>
          <p className="text-2xl font-bold">{stats.totalMinutes}</p>
        </div>
      </div>
    </div>
  );
}
