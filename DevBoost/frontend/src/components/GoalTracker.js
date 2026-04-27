import React, { useState, useEffect } from 'react';
import api from '../api';

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodaysGoals();
  }, []);

  const fetchTodaysGoals = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/goals/today');
      setGoals(data.goals || []);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    if (!newGoal.trim()) return;

    try {
      const updatedGoals = [...goals, newGoal];
      await api.post('/goals/today', { goals: updatedGoals.map((g) => (typeof g === 'string' ? g : g.text)) });
      setNewGoal('');
      fetchTodaysGoals();
    } catch (error) {
      console.error('Failed to add goal:', error);
    }
  };

  const toggleGoal = async (goalId) => {
    try {
      await api.put(`/goals/${goalId}/toggle`);
      fetchTodaysGoals();
    } catch (error) {
      console.error('Failed to toggle goal:', error);
    }
  };

  if (loading) return <div className="card">Loading goals...</div>;

  const completedCount = goals.filter((g) => g.completed).length;
  const completionRate = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">📋 Daily Goals</h2>

      <div className="mb-6">
        <div className="bg-slate-800 p-3 rounded mb-3">
          <p className="text-slate-400 text-sm">Today's Completion</p>
          <p className="text-2xl font-bold">{completionRate}%</p>
          <div className="bg-slate-700 h-2 rounded mt-2">
            <div
              className="bg-green-500 h-2 rounded transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {goals.map((goal, idx) => (
          <label key={idx} className="flex items-center gap-3 p-2 bg-slate-800 rounded cursor-pointer hover:bg-slate-700">
            <input
              type="checkbox"
              checked={goal.completed || false}
              onChange={() => toggleGoal(goal._id || idx)}
              className="w-5 h-5"
            />
            <span className={goal.completed ? 'line-through text-slate-500' : ''}>{goal.text || goal}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          placeholder="Add a new goal..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded px-4 py-2"
        />
        <button onClick={addGoal} className="btn-primary">
          Add
        </button>
      </div>
    </div>
  );
}
