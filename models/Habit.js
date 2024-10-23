module.exports = mongoose.model('Habit', HabitSchema)

const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['yesno', 'numeric', 'timer'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: null
  }
})

// Export the Habit model
module.exports = mongoose.model('Habit', HabitSchema)
