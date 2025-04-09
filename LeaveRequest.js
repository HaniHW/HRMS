const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's an Employee model
    required: true,
  },
  LeaveType: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  Reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  
}, { timestamps: true });

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);

