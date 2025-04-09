import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Importing axios for API calls
import CustomModel from "./CustomModel"; // Import the custom modal component
import "./LeaveRequest.css";  // Import the CSS file for custom styles
const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    LeaveType: "",
    fromDate: "",
    toDate: "",
    Reason: "",
  });

  const [showModal, setShowModal] = useState(false); // State for showing modal
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to be sent to the backend
    const data = {
      LeaveType: formData.LeaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      Reason: formData.Reason,
    };

    try {
      // Replace with your backend API URL
      const response = await axios.post("http://localhost:5000/leave/leave-request", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add your JWT token here
        },
      });

      console.log("Response from backend:", response.data);
      // Show the success modal after successful submission
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("There was an error submitting your leave request. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal, no navigation
  };

  const handleStatusRedirect = () => {
    setShowModal(false); // Close the modal first
    navigate("/Status"); // Redirect to the Status page
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="mainContent d-flex justify-content-center align-items-center">
        <div className="leave-request-form">
          <h1 className="h3 mb-3 text-center">Leave Request Form</h1>

          {/* Leave Request Form */}
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <select
                className="form-select"
                name="LeaveType"
                value={formData.LeaveType}
                onChange={handleChange}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>
            
            <div className="col-md-12">
              <input 
                className="form-control" 
                type="text" 
                name="fromDate" 
                value={formData.fromDate} 
                onChange={handleChange} 
                onFocus={(e) => (e.target.type = "date")} 
                onBlur={(e) => (e.target.type = "text")} 
                required 
                placeholder="From Date"   // Label-like placeholder
              />
            </div>

            <div className="col-md-12">
              <input 
                className="form-control" 
                type="text" 
                name="toDate" 
                value={formData.toDate} 
                onChange={handleChange} 
                onFocus={(e) => (e.target.type = "date")} 
                onBlur={(e) => (e.target.type = "text")} 
                required 
                placeholder="To Date"   // Label-like placeholder
              />
            </div>
             
            <div className="col-md-12 container">
              <textarea
                name="Reason"
                className="form-control"
                rows="4"
                placeholder="Enter reason for leave"
                value={formData.Reason}
                onChange={handleChange}
                required
              />
            </div>

            {/* Navigation Buttons */}
            <div className="col-12 d-flex justify-content-between">
  <button
    type="button"
    className="custom-btn back-btn"
    onClick={() => navigate("/All-Employee")}
  >
    🔙 Back
  </button>
  <button
  type="button"
  className="see-leaves-btn"
  onClick={() => navigate("/Status")}
>
  👁️ See All My Leaves
</button>
  <button type="submit" className="custom-btn submit-btn">
    🚀 Submit
  </button>
</div>

          </form>
        </div>
      </main>

      {/* Custom Success Modal */}
      <CustomModel
        show={showModal}
        onClose={handleCloseModal}
        title="Leave Request Sent Successfully"
        message="Your leave request has been submitted successfully."
        onStatusClick={handleStatusRedirect} // Pass status redirect function
      />
    </div>
  );
};

export default LeaveRequest;
