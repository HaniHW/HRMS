import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEmployee.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const nationalities = [
  "Pakistani", "Indian", "Bangladeshi", "Afghan", "American", "British",
  "Canadian", "Australian", "Chinese", "Turkish", "Saudi", "UAE",
  "Egyptian", "Brazilian", "Russian", "South African", "Indonesian", "Malaysian"
];

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    gender: "",
    nationality: "",
    dateOfBirth: "",
    jobTitle: "",
    employmentType: "",
    department: "",
    joiningDate: "",
    workLocation: "",
    salary: "",
    password: "",
    role: ""
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    try {
      // API Request
      const token = localStorage.getItem("token");

      const response = await axios.post(
      "http://localhost:5000/employees/Add-employee",
      formData,
      {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (response.data.success) {
        alert("✅ Employee Information stored successfully!");
        navigate("/All-Employee"); // Navigate to All Employees info page
      } else {
        alert("❌ Failed to store Personal Information!");
      }
    } catch (error) {
      console.error("❌ Error submitting personal information:", error.response?.data || error.message);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      <div className="content">
      {/* Main Content */}
      <main className="col-md-60 bg-white p-4 d-flex justify-content-center align-items-center min-vh-100 mainContent">
        <div className="w-100 w-md-75">
          <h1 className="h3 mb-3 text-center">Add New Employee</h1>

          {/* Personal Information Form */}
          <form className="row g-3" onSubmit={handlePersonalSubmit}>
            <button type="button" className="btn btn-primary" disabled>
              Personal Information
            </button>
            <div className="col-md-6">
              <input className="form-control" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <input className="form-control" type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <input className="form-control" type="text" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required />
            </div>

            <div className="col-md-6">
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-md-6">
              <select className="form-select" name="nationality" value={formData.nationality} onChange={handleChange} required>
                <option value="">Select Nationality</option>
                {nationalities.map((nation, index) => (
                  <option key={index} value={nation}>{nation}</option>
                ))}
              </select>
            </div>
            <button type="button" className="btn btn-primary" disabled>
              Professional Information
            </button>

            <div className="col-md-6">
              <input className="form-control" type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <select className="form-select" name="employmentType" value={formData.employmentType} onChange={handleChange} required>
                <option value="">Select Employment Type</option>
                <option>Part Time</option>
                <option>Full Time</option>
                <option>Contract</option>
                <option>Intern</option>
              </select>
            </div>

            <div className="col-md-6">
              <select className="form-select" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option>Design</option>
                <option>Development</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Project Management</option>
                <option>Testing</option>
                <option>HR</option>
                <option>Finance</option>
                <option>System Administration </option>

              </select>
            </div>

            <div className="col-md-6">
              <input className="form-control" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <select className="form-select" name="workLocation" value={formData.workLocation} onChange={handleChange} required>
                <option value="">Work Location</option>
                <option>Remote</option>
                <option>On-Site</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="col-md-6">
              <input className="form-control" type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
            </div>
            <button className="btn btn-primary" disabled>Account Access</button>

            <div className="col-md-6">
              <input className="form-control" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option>employee</option>
                <option>admin</option>
              </select>
            </div>

            {/* Navigation Buttons */}
            <div className="col-12 d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/All-Employee")}>Back</button>
              <button type="submit" className="btn btn-primary">Next</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
  );
};

export default AddEmployee;
