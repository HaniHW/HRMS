import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEmployee.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AccountAccess = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeId = localStorage.getItem("employeeId");
    console.log("🔍 Retrieved Employee ID:", employeeId); // ✅ Debugging

    if (!employeeId) {
      alert("❌ Error: Employee ID not found!"); // Employee ID not available
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/employees/account-access", {
        employeeId,
        ...formData,
      });

      // If the response is successful
      if (response.data.success) {
        alert("✅ Employee added successfully!");
        navigate("/All-Employee"); // Redirect after success
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error setting account access:", error.response?.data || error.message);
      alert("❌ Failed to add employee. Please try again.");
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
          <button className="btn btn-outline-secondary" onClick={() => navigate("/pro-Information")}>Professional Information</button>
          <button className="btn btn-primary" onClick={() => navigate("/Account-Access")}>Account Access</button>
        </div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="btns">
            <button className="backBtn" type="button" onClick={() => navigate("/pro-Information")}>
              Back
            </button>
            <button className="nextBtn" type="submit">
              Done
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AccountAccess;
