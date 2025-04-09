const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['in', 'out'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    required: true,
    index: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);