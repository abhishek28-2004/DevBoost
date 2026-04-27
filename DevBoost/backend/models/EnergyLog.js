const mongoose = require('mongoose');

const energyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(new Date().setHours(0, 0, 0, 0)),
  },
  focusLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  mood: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure one log per user per day
energyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('EnergyLog', energyLogSchema);
