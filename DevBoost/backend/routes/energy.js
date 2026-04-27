const express = require('express');
const authMiddleware = require('../middleware/auth');
const EnergyLog = require('../models/EnergyLog');
const router = express.Router();

// Log energy for today
router.post('/today', authMiddleware, async (req, res) => {
  try {
    const { focusLevel, mood, notes } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let log = await EnergyLog.findOne({ userId: req.userId, date: today });

    if (log) {
      log.focusLevel = focusLevel;
      log.mood = mood;
      log.notes = notes;
    } else {
      log = new EnergyLog({
        userId: req.userId,
        date: today,
        focusLevel,
        mood,
        notes,
      });
    }

    await log.save();
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get today's energy log
router.get('/today', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = await EnergyLog.findOne({ userId: req.userId, date: today });
    res.json(log || { focusLevel: 0, mood: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weekly energy logs
router.get('/weekly', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const logs = await EnergyLog.find({
      userId: req.userId,
      date: { $gte: weekStart, $lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000) },
    }).sort({ date: 1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
