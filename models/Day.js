const mongoose = require('mongoose')

const DaySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
    unique: true
  },
  dailyHabits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DailyHabit'
    }
  ],
  completed: {
    type: Boolean,
    required: true
  }
})

// Ensure the _id is set to the formatted date string (YYYY-MM-DD)
DaySchema.pre('save', function (next) {
  if (!this._id) {
    this._id = this.timestamp.toISOString().split('T')[0] // Set the _id to the formatted date string
  }
  next()
})

module.exports = mongoose.model('Day', DaySchema)