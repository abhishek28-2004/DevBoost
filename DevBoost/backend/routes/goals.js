const express = require('express');
const authMiddleware = require('../middleware/auth');
const Goal = require('../models/Goal');
const router = express.Router();

// Set goals for today
router.post('/today', authMiddleware, async (req, res) => {
  try {
    const { goals } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let goalDoc = await Goal.findOne({ userId: req.userId, date: today });

    if (goalDoc) {
      goalDoc.goals = goals.map((g) => ({
        text: g,
        completed: false,
      }));
    } else {
      goalDoc = new Goal({
        userId: req.userId,
        date: today,
        goals: goals.map((g) => ({
          text: g,
          completed: false,
        })),
      });
    }

    await goalDoc.save();
    res.json(goalDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get today's goals
router.get('/today', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const goalDoc = await Goal.findOne({ userId: req.userId, date: today });
    res.json(goalDoc || { goals: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark goal as complete
router.put('/:goalId/toggle', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const goalDoc = await Goal.findOne({ userId: req.userId, date: today });
    if (!goalDoc) {
      return res.status(404).json({ error: 'Goals not found' });
    }

    const goal = goalDoc.goals.find((g) => g._id.toString() === req.params.goalId);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    goal.completed = !goal.completed;
    goal.completedAt = goal.completed ? new Date() : null;

    await goalDoc.save();
    res.json(goalDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weekly stats
router.get('/stats/weekly', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const goals = await Goal.find({
      userId: req.userId,
      date: { $gte: weekStart, $lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000) },
    });

    const stats = goals.map((g) => ({
      date: g.date,
      total: g.goals.length,
      completed: g.goals.filter((goal) => goal.completed).length,
    }));

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
