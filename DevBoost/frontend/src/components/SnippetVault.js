import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import api from '../api';

export default function SnippetVault() {
  const [snippets, setSnippets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    language: 'javascript',
    tags: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/snippets');
      setSnippets(data);
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSnippet = async () => {
    try {
      await api.post('/snippets', {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()),
      });
      setFormData({ title: '', code: '', language: 'javascript', tags: '', description: '' });
      setShowForm(false);
      fetchSnippets();
    } catch (error) {
      console.error('Failed to add snippet:', error);
    }
  };

  const deleteSnippet = async (id) => {
    try {
      await api.delete(`/snippets/${id}`);
      fetchSnippets();
    } catch (error) {
      console.error('Failed to delete snippet:', error);
    }
  };

  if (loading) return <div className="card">Loading snippets...</div>;

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">💾 Snippet Vault</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add Snippet'}
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-800 p-4 rounded mb-6 space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2"
            />
            <textarea
              placeholder="Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 h-32 font-mono"
            />
            <input
              type="text"
              placeholder="Language (javascript, python, etc)"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 h-20"
            />
            <button onClick={addSnippet} className="btn-primary w-full">
              Save Snippet
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {snippets.map((snippet) => (
          <div key={snippet._id} className="card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold">{snippet.title}</h3>
                {snippet.description && <p className="text-slate-400 text-sm">{snippet.description}</p>}
              </div>
              <button
                onClick={() => deleteSnippet(snippet._id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>

            <SyntaxHighlighter language={snippet.language} style={atomOneDark} className="rounded mb-3">
              {snippet.code}
            </SyntaxHighlighter>

            {snippet.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map((tag) => (
                  <span key={tag} className="bg-blue-900 text-blue-100 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
