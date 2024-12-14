const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['yesno', 'numeric', 'timer'],
    required: true
  },
  frequency: {
    type: mongoose.Schema.Types.Mixed,  // Flexible type to accept different formats
    required: true,
    validate: {
      validator(value) {
        if (value === 'daily') return true;

        if (value && value.week && Array.isArray(value.week)) {
          return value.week.every(day => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day));
        }

        if (value && value.month && Array.isArray(value.month)) {
          return value.month.every(day => Number.isInteger(day) && day >= 1 && day <= 31);
        }

        return false;
      },
      message: 'Invalid frequency format'
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: false
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
  }
});

module.exports = mongoose.model('Habit', HabitSchema);
