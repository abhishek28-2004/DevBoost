const express = require('express');
const authMiddleware = require('../middleware/auth');
const PomodoroSession = require('../models/PomodoroSession');
const router = express.Router();

// Create pomodoro session
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const { task, duration } = req.body;
    const session = new PomodoroSession({
      userId: req.userId,
      task,
      duration: duration || 25,
    });
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete pomodoro session
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const session = await PomodoroSession.findByIdAndUpdate(
      req.params.id,
      { completed: true, completedAt: new Date() },
      { new: true }
    );
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sessions = await PomodoroSession.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get today's stats
router.get('/stats/today', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sessions = await PomodoroSession.find({
      userId: req.userId,
      startedAt: { $gte: today, $lt: tomorrow },
    });

    const completed = sessions.filter((s) => s.completed).length;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

    res.json({ total: sessions.length, completed, totalMinutes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
