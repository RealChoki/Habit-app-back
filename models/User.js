const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  habits: [
    {
      habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
      }
    }
  ]
})

module.exports = mongoose.model('User', UserSchema)
