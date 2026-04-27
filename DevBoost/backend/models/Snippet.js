const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'javascript',
  },
  tags: [String],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for searching snippets by user and tags
snippetSchema.index({ userId: 1, tags: 1 });

module.exports = mongoose.model('Snippet', snippetSchema);
