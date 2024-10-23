const mongoose = require('mongoose')

const DailyHabitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: null
  },
  // For numeric habits:
  count: {
    type: Number
  },
  goal: {
    type: Number
  },
  subtype: {
    type: String,
    enum: ['increment', 'decrement']
  },
  // For timer habits:
  currentTime: {
    type: Number
  },
  initialTime: {
    type: Number
  },
  timerInterval: {
    type: mongoose.Schema.Types.Mixed
  }
})

module.exports = mongoose.model('DailyHabit', DailyHabitSchema)
