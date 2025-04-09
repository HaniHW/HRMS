const LeaveRequest = require("../models/LeaveRequest");

// POST route: Create a new leave request
exports.createLeaveRequest = async (req, res) => {
  const { LeaveType, fromDate, toDate, Reason } = req.body;
  try {
    const leaveRequest = new LeaveRequest({
      employeeId: req.user.id,  // Assuming employee ID is available via JWT
      LeaveType,
      fromDate,
      toDate,
      Reason,
      status: "Pending",
    });

    await leaveRequest.save();
    return res.status(200).json({ success: true, message: "Leave request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    return res.status(500).json({ success: false, message: "Failed to submit leave request!" });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ employeeId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching leave requests" });
  }
};

// Controller: leaveRequest.controllers.js
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find()
      .populate('employeeId', 'firstName lastName') // Populating employee details
      .exec();

    if (!leaveRequests || leaveRequests.length === 0) {
      return res.status(404).json({ message: "No leave requests available" });
    }

    // Combine firstName and lastName for each leave request
    const formattedLeaveRequests = leaveRequests.map(request => {
      const employeeName = `${request.employeeId.firstName} ${request.employeeId.lastName}`;
      
      // Return leave request with combined employee name
      return {
        ...request.toObject(),
        employeeName, // Add combined employee name to the response
      };
    });

    console.log('Formatted Leave Requests:', formattedLeaveRequests); // Log to ensure data is correct
    res.status(200).json(formattedLeaveRequests); // Return the leave requests with combined employee name
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ message: 'Error fetching leave requests', error: error.message });
  }
};



// Backend: Controller for updating leave request status
// Controller: leaveRequest.controllers.js

exports.updateLeaveRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;  // Get requestId and status from the body

  try {
    // Find the leave request by its ID and update the status
    const updatedRequest = await LeaveRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Leave request not found" });
    }

    // Optionally: Notify employee via email or system notification (if required)

    res.status(200).json({ success: true, message: "Leave request status updated", request: updatedRequest });
  } catch (error) {
    console.error("Error updating leave request status:", error);
    res.status(500).json({ success: false, message: "Failed to update leave request status" });
  }
};



