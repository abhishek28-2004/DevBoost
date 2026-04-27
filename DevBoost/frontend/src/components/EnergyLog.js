import React, { useState, useEffect } from 'react';
import api from '../api';

export default function EnergyLog() {
  const [focus, setFocus] = useState(5);
  const [mood, setMood] = useState(5);
  const [notes, setNotes] = useState('');
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    fetchTodaysLog();
  }, []);

  const fetchTodaysLog = async () => {
    try {
      const { data } = await api.get('/energy/today');
      if (data.focusLevel) {
        setFocus(data.focusLevel);
        setMood(data.mood);
        setNotes(data.notes || '');
        setHasLogged(true);
      }
    } catch (error) {
      console.error('Failed to fetch energy log:', error);
    }
  };

  const logEnergy = async () => {
    try {
      await api.post('/energy/today', { focusLevel: focus, mood, notes });
      setHasLogged(true);
    } catch (error) {
      console.error('Failed to log energy:', error);
    }
  };

  const getEmoji = (value) => {
    if (value <= 3) return '😴';
    if (value <= 6) return '😐';
    return '🚀';
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">⚡ Energy & Mood Tracker</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-semibold">Focus Level {getEmoji(focus)}</label>
            <span className="text-2xl font-bold">{focus}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="font-semibold">Mood {getEmoji(mood)}</label>
            <span className="text-2xl font-bold">{mood}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 h-20"
          />
        </div>

        <button onClick={logEnergy} className="btn-primary w-full">
          {hasLogged ? 'Update Log' : 'Log Energy'}
        </button>
      </div>
    </div>
  );
}
