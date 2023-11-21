// Importing mongoose for schema definition
const mongoose = require('mongoose');

// Defining statusSchema
const statusSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  datestatus: {
    type: String
  },
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habits',
  }
}, {
  timestamps: true
});

// Creating Status model
const Status = mongoose.model('Status', statusSchema);

// Exporting the Status model
module.exports = Status;
