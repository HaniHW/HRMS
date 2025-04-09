import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Documents.css"; // Import custom CSS
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");

  // State to store uploaded files
  const [documents, setDocuments] = useState({
    appointmentLetter: null,
    salarySlips: null,
    relivingLetter: null,
    experienceLetter: null,
  });

  // Handle File Selection
  const handleFileChange = (e, docType) => {
    setDocuments({ ...documents, [docType]: e.target.files[0] });
  };

  // Submit Form (Upload Documents)
  const handleSubmit = async () => {
    if (!employeeId) {
      console.error("Error: Employee ID not found!");
      return;
    }

    const formData = new FormData();
    formData.append("employeeId", employeeId);  // Automatically uses the employeeId from localStorage
    formData.append("appointmentLetter", documents.appointmentLetter);
    formData.append("salarySlips", documents.salarySlips);
    formData.append("relivingLetter", documents.relivingLetter);
    formData.append("experienceLetter", documents.experienceLetter);

    try {
      const response = await axios.post("http://localhost:5000/employees/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload successful:", response.data);  // Log response for success
      navigate("/Account-Access"); // Navigate to next page if successful
    } catch (error) {
      console.error("Error uploading documents:", error.response?.data || error.message);
    }
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <div className="header">
          <div>
            <h2>Add New Employee</h2>
            <p>All Employee &gt; Add New Employee</p>
          </div>
          <input type="text" placeholder="Search" className="search-box" />
        </div>

        {/* Tabs */}
        <h1 className="h3 mb-3">Add New Employee</h1>
        <div className="btn-group mb-3" role="group">
          <button className="btn btn-outline-secondary">Personal Information</button>
          <button className="btn btn-outline-secondary">Professional Information</button>
          <button className="btn btn-outline-secondary">Salary Details</button>
          <button className="btn btn-primary">Documents</button>
          <button className="btn btn-outline-secondary">Account Access</button>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          {[
            { label: "Appointment Letter", name: "appointmentLetter" },
            { label: "Salary Slips", name: "salarySlips" },
            { label: "Relieving Letter", name: "relivingLetter" },
            { label: "Experience Letter", name: "experienceLetter" },
          ].map((doc, index) => (
            <div key={index} className="upload-box">
              <p>Upload {doc.label}</p>
              <label className="file-label">
                Drag & Drop or <span className="choose-file">choose file</span> to upload
                <input type="file" className="file-input" onChange={(e) => handleFileChange(e, doc.name)} />
              </label>
              <p className="format-text">Supported formats: .jpeg, .pdf</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="btn back-btn" onClick={() => navigate("/pro-Information")}>
            Back
          </button>
          <button className="btn next-btn" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
