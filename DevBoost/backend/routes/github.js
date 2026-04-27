const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get GitHub stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const githubUsername = user.githubUsername || process.env.GITHUB_USERNAME;

    if (!githubUsername) {
      return res.status(400).json({ error: 'GitHub username not configured' });
    }

    const { data } = await axios.get(`https://api.github.com/users/${githubUsername}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    res.json({
      username: data.login,
      name: data.name,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      avatar: data.avatar_url,
      bio: data.bio,
      location: data.location,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
});

// Get recent repos
router.get('/repos', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const githubUsername = user.githubUsername || process.env.GITHUB_USERNAME;

    const { data } = await axios.get(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const repos = data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      description: repo.description,
      updatedAt: repo.updated_at,
    }));

    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

// Update GitHub username
router.post('/username', authMiddleware, async (req, res) => {
  try {
    const { githubUsername } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { githubUsername },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
