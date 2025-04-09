import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEmployee.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProInformation = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    employmentType: "",
    joiningDate: "",
    workLocation: "",
    salary: "",
  });

  const navigate = useNavigate();
  
  // Input change handle karne ka function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit karne ka function
 
  const handleProfessionalSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const employeeId = localStorage.getItem("employeeId"); // Get Employee ID from localStorage
    console.log("📌 Retrieved Employee ID:", employeeId);

    if (!employeeId) {
        alert("❌ Error: Employee ID not found! Please fill personal information first.");
        return;
    }

    try {
        const response = await axios.put(`http://localhost:5000/employees/professional-info${employeeId}`, { 
            employeeId, // Include employeeId in the request
            professionalInformation: formData // Send professional information
        });

        console.log("✅ API Response:", response.data);
        // Handle response...
    } catch (error) {
        console.error("❌ Error submitting professional information:", error.response?.data || error.message);
        alert("❌ Something went wrong. Please try again.");
    }
};

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="col-md-9 bg-white p-4">
        <button className="btn btn-primary mb-3">Add New Employee</button>
        <h1 className="h3 mb-3">Add New Employee</h1>
        <div className="btn-group mb-3" role="group">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/Add-Employee")}>Personal Information</button>
          <button className="btn btn-primary" onClick={() => navigate("/pro-Information")}>Professional Information</button>
          {/* <button className="btn btn-outline-secondary">Salary Details</button>
          <button className="btn btn-outline-secondary">Documents</button>*/}
          <button className="btn btn-outline-secondary" onClick={() => navigate("/Account-Access")}>Account Access</button>
        </div>

        {/* Form with onSubmit */}
        <form className="row g-3" onSubmit={handleProfessionalSubmit}>
          <div className="col-md-6">
            <input className="form-control" type="text" placeholder="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <select className="form-select" name="employmentType" value={formData.employmentType} onChange={handleChange} required>
              <option value="">Select Employment Type</option>
              <option value="Part Time">Part Time</option>
              <option value="Full Time">Full Time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          <div className="col-md-6">
            <select className="form-select" name="department" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="col-md-6">
            <input className="form-control" type="date" placeholder="Joining Date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <select className="form-select" name="workLocation" value={formData.workLocation} onChange={handleChange} required>
              <option value="">Work Location</option>
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="col-md-6">
            <input className="form-control" type="text" placeholder="Salary" name="salary" value={formData.salary} onChange={handleChange} required />
          </div>

          {/* Buttons */}
          <div className="btns">
            <button className="backBtn" type="button" onClick={() => navigate("/Add-Employee")}>Back</button>
            <button className="nextBtn" type="submit">Next</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProInformation;
