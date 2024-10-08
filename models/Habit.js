const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['yesno', 'numeric', 'timer'],
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: null,
  },
  // For numeric habits
  count: Number,
  goal: Number,
  subtype: {
    type: String,
    enum: ['increment', 'decrement'],
  },
  // For timer habits
  timer: Number,
  default: Number,
  timerInterval: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model('Habit', HabitSchema);
