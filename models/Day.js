const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
  metadata: {
    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  completed: {
    type: Boolean,
    required: true,
  },
  tasks: {
    type: Map,
    of: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    required: true,
  }
});

module.exports = mongoose.model('Day', DaySchema);
