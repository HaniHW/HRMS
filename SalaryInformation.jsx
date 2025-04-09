import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEmployee.css"
import Sidebar from "./Sidebar"
import {useNavigate } from "react-router-dom";

const SalaryInformation = () => {
  const navigate=useNavigate();
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
     
      <Sidebar/>

      {/* Main Content */}
      <main className="col-md-9 bg-white p-4">
        <button className="btn btn-primary mb-3">Add New Employee</button>
        <h1 className="h3 mb-3">Add New Employee</h1>
        <div className="btn-group mb-3" role="group">
          <button className="btn btn-outline-secondary">Personal Information</button>
          <button className="btn btn-outline-secondary">Professional Information</button>
          <button className="btn btn-primary">Salary Details</button>
          
          <button className="btn btn-outline-secondary">Documents</button>
          <button className="btn btn-outline-secondary">Account Access</button>
        </div>
        <form className="row g-3">
          <div className="col-md-6">
            <input className="form-control" type="text" placeholder="Basic Salary" />
          </div>
          <div className="col-md-6">
            <input className="form-control" type="text" placeholder="Job Title" />
          </div>
          <div className="col-md-6">
            <input className="form-control" type="text" placeholder="Employment Type" />
          </div>
         


         <div className="btns">
          
         <button  className="backBtn" onClick={() => navigate("/Add-Employee")}>Back</button>
         <button className="nextBtn" onClick={() => navigate("/Documents")}>Next</button>
    

         </div>
          
          
        </form>
      </main>
    </div>
  );
};

export default SalaryInformation;
