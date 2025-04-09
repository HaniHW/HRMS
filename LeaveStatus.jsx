import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import axios from 'axios';
import './LeaveStatus.css';

const LeaveStatus = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leave requests from backend
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/leave/my-requests", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="container bg-white shadow-md rounded p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Leave Status</h2>
          {loading ? (
            <p>Loading...</p>
          ) : leaveRequests.length === 0 ? (
            <p>No leave requests available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.LeaveType}</td>
                    <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                    <td>{new Date(request.toDate).toLocaleDateString()}</td>
                    <td>{request.Reason}</td>
                    <td
  className={`${
    request.status === 'Approved'
      ? 'approved'  // Custom class for approved status
      : request.status === 'Rejected'
      ? 'rejected'  // Custom class for rejected status
      : 'pending'   // Custom class for pending or other statuses
  }`}
>
  {request.status}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;
