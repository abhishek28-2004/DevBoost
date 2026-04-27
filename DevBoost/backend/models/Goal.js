const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(new Date().setHours(0, 0, 0, 0)),
  },
  goals: [
    {
      text: String,
      completed: { type: Boolean, default: false },
      completedAt: Date,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure one set of goals per user per day
goalSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Goal', goalSchema);
