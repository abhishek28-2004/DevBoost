const mongoose = require('mongoose');

const pomodoroSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  duration: {
    type: Number,
    default: 25,
    description: 'Duration in minutes',
  },
  task: String,
  completed: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PomodoroSession', pomodoroSessionSchema);
