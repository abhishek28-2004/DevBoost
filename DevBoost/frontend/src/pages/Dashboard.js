import React, { useState, useEffect } from 'react';
import GitHubStats from '../components/GitHubStats';
import PomodoroTimer from '../components/PomodoroTimer';
import GoalTracker from '../components/GoalTracker';
import EnergyLog from '../components/EnergyLog';
import SnippetVault from '../components/SnippetVault';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}! 🚀</h1>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {['overview', 'github', 'pomodoro', 'goals', 'energy', 'snippets'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded font-semibold transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GitHubStats />
              <PomodoroTimer />
              <GoalTracker />
              <EnergyLog />
            </div>
          )}
          {activeTab === 'github' && <GitHubStats />}
          {activeTab === 'pomodoro' && <PomodoroTimer />}
          {activeTab === 'goals' && <GoalTracker />}
          {activeTab === 'energy' && <EnergyLog />}
          {activeTab === 'snippets' && <SnippetVault />}
        </div>
      </div>
    </div>
  );
}
