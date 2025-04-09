const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  punchInTime: { type: String, required: true },  
  hoursWorked: { type: Number, required: true },  
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
