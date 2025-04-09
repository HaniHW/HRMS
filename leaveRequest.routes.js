const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require("../middlewares/authMiddleware"); // Import the authentication and role authorization middleware
const leaveRequestController = require('../controllers/leaveRequest.controllers');

// POST: Submit a leave request (for employee)
router.post("/leave-request", auth, authorizeRoles("employee"), leaveRequestController.createLeaveRequest);

// GET: Get the details of leave requests for an employee
router.get("/my-requests", auth, authorizeRoles("employee"), leaveRequestController.getRequests);

// GET: Admin can view all leave requests
router.get("/all-requests", auth, authorizeRoles("admin"), leaveRequestController.getAllLeaveRequests);

// PATCH: Admin can update the status of leave requests (Approve/Reject)
router.patch("/update-status", auth, authorizeRoles("admin"), leaveRequestController.updateLeaveRequestStatus);

module.exports = router;


// GET: Get all pending leave requests (for admin)
/*router.get("/admin/leave-requests", verifyToken, leaveRequestController.getLeaveRequestsForAdmin);

// PUT: Update the leave request status (approve/reject) by admin
router.put("/admin/leave-request/:id", verifyToken, leaveRequestController.updateLeaveRequestStatus);


*/
