import React, { useState, useEffect } from 'react';
import api from '../api';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      const [statsRes, reposRes] = await Promise.all([
        api.get('/github/stats'),
        api.get('/github/repos'),
      ]);
      setStats(statsRes.data);
      setRepos(reposRes.data);
    } catch (error) {
      console.error('Failed to fetch GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="card">Loading GitHub stats...</div>;
  if (!stats) return <div className="card text-red-400">Failed to load GitHub stats</div>;

  return (
    <div className="card md:col-span-2">
      <div className="flex items-center gap-4 mb-6">
        {stats.avatar && <img src={stats.avatar} alt={stats.username} className="w-16 h-16 rounded-full" />}
        <div>
          <h2 className="text-2xl font-bold">{stats.name}</h2>
          <p className="text-slate-400">@{stats.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 p-3 rounded">
          <p className="text-slate-400 text-sm">Followers</p>
          <p className="text-2xl font-bold">{stats.followers}</p>
        </div>
        <div className="bg-slate-800 p-3 rounded">
          <p className="text-slate-400 text-sm">Public Repos</p>
          <p className="text-2xl font-bold">{stats.publicRepos}</p>
        </div>
        <div className="bg-slate-800 p-3 rounded">
          <p className="text-slate-400 text-sm">Following</p>
          <p className="text-2xl font-bold">{stats.following}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Repos</h3>
        <div className="space-y-2">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-800 p-3 rounded hover:bg-slate-700 transition"
            >
              <p className="font-semibold">{repo.name}</p>
              <p className="text-slate-400 text-sm">{repo.description}</p>
              <div className="flex gap-3 mt-2 text-xs">
                {repo.language && <span className="bg-slate-600 px-2 py-1 rounded">{repo.language}</span>}
                <span className="text-slate-400">⭐ {repo.stars}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
