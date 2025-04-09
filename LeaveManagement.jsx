import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import axios from 'axios'; // Importing axios to fetch data
import './LeaveManagement.css'; // Importing the CSS file

const LeaveManagement = () => {
  // State to hold the leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage

  // Fetch leave requests from the backend
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/leave/all-requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Backend Response:", response.data);  // Log the full response
      setLeaveRequests(response.data); // Directly use response.data since it's already the list
    } catch (error) {
      console.error('Error fetching leave requests', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, [token]); // Empty dependency array to fetch data only once when component mounts

  // Function to handle Approve/Reject
  const handleAction = async (id, action) => {
    try {
      // Send a PATCH request to update the status on the backend
      const response = await axios.patch(
        'http://localhost:5000/leave/update-status',
        { requestId: id, status: action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // If successful, update the local state with the new status
      if (response.data.success) {
        const updatedRequests = leaveRequests.map(request => {
          if (request._id === id) {
            return { ...request, status: action };  // Update status locally
          }
          return request;
        });

        setLeaveRequests(updatedRequests); // Update local state for admin

        // Refetch leave requests for the employee to reflect status change
        fetchLeaveRequests();  // Ensure the employee sees the updated status
      }
    } catch (error) {
      console.error('Error updating leave status', error);
    }
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="container bg-white shadow-md rounded p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Employee Leave Requests</h2>
          {leaveRequests.length === 0 ? (
            <p>No leave requests available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(request => (
                  <tr key={request._id}>
                    <td>{request.employeeName || 'Unknown'}</td>
                    <td>{request.LeaveType || 'N/A'}</td>
                    <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                    <td>{new Date(request.toDate).toLocaleDateString()}</td>
                    <td>{request.Reason || 'N/A'}</td>
                    <td
                      className={`${
                        request.status === 'Approved'
                          ? 'text-green-600'
                          : request.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {request.status}
                    </td>
                    <td>
                      <button
                        className="approve"
                        onClick={() => handleAction(request._id, 'Approved')}
                        disabled={request.status !== 'Pending'}
                      >
                        Approve
                      </button>
                      <button
                        className="reject"
                        onClick={() => handleAction(request._id, 'Rejected')}
                        disabled={request.status !== 'Pending'}
                      >
                        Reject
                      </button>
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

export default LeaveManagement;















// import React, { useState } from 'react';
// import Sidebar from "./Sidebar";
// import './LeaveManagement.css'; // Importing the CSS file

// const LeaveManagement = () => {
//   // Sample Data (In future: Fetch from backend)
//   const [leaveRequests, setLeaveRequests] = useState([
//     {
//       id: 1,
//       employeeName: 'Ali Khan',
//       leaveType: 'Sick Leave',
//       fromDate: '2025-03-20',
//       toDate: '2025-03-22',
//       reason: 'Flu and fever',
//       status: 'Pending'
//     },
//     {
//       id: 2,
//       employeeName: 'Sara Ahmed',
//       leaveType: 'Annual Leave',
//       fromDate: '2025-04-01',
//       toDate: '2025-04-10',
//       reason: 'Family trip',
//       status: 'Pending'
//     },
//     {
//       id:3,
//       employeeName:"Saman Qayum",
//       leaveType:"Casual Leave",
//       fromDate: '2025-04-03',
//       toDate: '2025-04-4',
//       reason: 'Shopping',
//       status: 'Pending'
//     },
//   ]);/

//   // Function to handle Approve/Reject
//   const handleAction = (id, action) => {
//     const updatedRequests = leaveRequests.map(request => {
//       if (request.id === id) {
//         return { ...request, status: action };
//       }
//       return request;
//     });
//     setLeaveRequests(updatedRequests);
//   };

//   return (
//     <div className="d-flex min-vh-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4 bg-light">
//         <div className="container bg-white shadow-md rounded p-4">
//           <h2 className="text-3xl font-bold mb-8 text-center">Employee Leave Requests</h2> {/* Added margin for gap */}
//           {leaveRequests.length === 0 ? (
//             <p>No leave requests available.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Employee Name</th>
//                   <th>Leave Type</th>
//                   <th>From</th>
//                   <th>To</th>
//                   <th>Reason</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaveRequests.map(request => (
//                   <tr key={request.id}>
//                     <td>{request.employeeName}</td>
//                     <td>{request.leaveType}</td>
//                     <td>{request.fromDate}</td>
//                     <td>{request.toDate}</td>
//                     <td>{request.reason}</td>
//                     <td
//                       className={`${
//                         request.status === 'Approved'
//                           ? 'text-green-600'
//                           : request.status === 'Rejected'
//                           ? 'text-red-600'
//                           : 'text-yellow-600'
//                       }`}
//                     >
//                       {request.status}
//                     </td>
//                     <td>
//                       <button
//                         className="approve"
//                         onClick={() => handleAction(request.id, 'Approved')}
//                         disabled={request.status !== 'Pending'}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="reject"
//                         onClick={() => handleAction(request.id, 'Rejected')}
//                         disabled={request.status !== 'Pending'}
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveManagement;
