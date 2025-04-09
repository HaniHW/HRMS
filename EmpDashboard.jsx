import React from "react";
import Sidebar from "./Sidebar";
import UserInfo from "./UserInfo";
import Attendence from "./Attendence";
import Schedule from "./Schedule";
import "./EmpDashboard.css";

const EmpDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <UserInfo />
        <div className="content-section">
          <Attendence />
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
