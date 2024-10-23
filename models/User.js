const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
