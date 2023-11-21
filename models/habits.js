// Importing mongoose for schema definition
const mongoose = require('mongoose');

// Defining habitSchema
const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status',
    }
  ]
}, {
  timestamps: true
});

// Creating Habits model
const Habits = mongoose.model('Habits', habitSchema);

// Exporting the Habits model
module.exports = Habits;
