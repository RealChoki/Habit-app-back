const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  habits: {
    type: Map,
    of: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habits",
    },
    required: true,
  },
});

module.exports = mongoose.model("Day", DaySchema);
