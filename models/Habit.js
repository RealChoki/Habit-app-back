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
        // Validate daily frequency as a string
        if (value === 'daily') return true;

        // Validate weekly frequency as an object with "week" array
        if (value && value.week && Array.isArray(value.week)) {
          return value.week.every(day => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day));
        }

        // Validate monthly frequency as an object with "month" array
        if (value && value.month && Array.isArray(value.month)) {
          return value.month.every(day => Number.isInteger(day) && day >= 1 && day <= 31);
        }

        return false;  // If none of the conditions match
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
  }
});

module.exports = mongoose.model('Habit', HabitSchema);
