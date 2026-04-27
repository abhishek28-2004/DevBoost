const express = require('express');
const authMiddleware = require('../middleware/auth');
const Snippet = require('../models/Snippet');
const router = express.Router();

// Create snippet
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, code, language, tags, description } = req.body;
    const snippet = new Snippet({
      userId: req.userId,
      title,
      code,
      language: language || 'javascript',
      tags: tags || [],
      description,
    });
    await snippet.save();
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all snippets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search snippets by tag
router.get('/search/:tag', authMiddleware, async (req, res) => {
  try {
    const snippets = await Snippet.find({
      userId: req.userId,
      tags: req.params.tag,
    });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single snippet
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet || snippet.userId.toString() !== req.userId.toString()) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update snippet
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet || snippet.userId.toString() !== req.userId.toString()) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    Object.assign(snippet, req.body);
    await snippet.save();
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete snippet
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet || snippet.userId.toString() !== req.userId.toString()) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
