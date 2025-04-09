import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("User"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <aside className="sidebar col-md-18 bg-dark text-white p-4">
        <h4 className="mb-2">HRMS</h4>
        <ul className="list-unstyled">
          <li className={`mb-2 ${location.pathname === "/Dashboard" ? "active" : ""}`} onClick={() => navigate("/Dashboard")}>📊 Dashboard</li>
          <li className={`mb-2 ${location.pathname === "/All-Employee" ? "active" : ""}`} onClick={() => navigate("/All-Employee")}>👥 All Employees</li>
          <li className={`mb-2 ${location.pathname === "/Departments" ? "active" : ""}`} onClick={() => navigate("/Departments")}>🏢 All Departments</li>
          <li className="mb-2"></li>
          <li className={`mb-2 ${location.pathname === "/Attendance" ? "active" : ""}`} onClick={() => navigate("/Attendance")}>📆 Attendance</li>
          <li className={`mb-2 ${location.pathname === "/Payroll" ? "active" : ""}`} onClick={() => navigate("/Payroll")}>💰 Payroll</li>
          <li className={`mb-2 ${location.pathname === "/Jobs" ? "active" : ""}`} onClick={() => navigate("/Jobs")}>📄 Jobs</li>
          <li className="mb-2">📋 Candidates</li>

          {/* Conditional route for Leaves */}
          <li
            className={`mb-2 ${(location.pathname === "/leave-request" || location.pathname === "/leave-Manage") ? "active" : ""}`}
            onClick={() => navigate(isAdmin ? "/leave-Manage" : "/leave-Request")}
          >
            🏖️ Leaves
          </li>

          <li className={`mb-2 ${location.pathname === "/Holidays" ? "active" : ""}`} onClick={() => navigate("/Holidays")}>🎉 Holidays</li>
          <li className={`mb-2 ${location.pathname === "/Settings" ? "active" : ""}`} onClick={() => navigate("/Settings")}>⚙️ Settings</li>
          <li className="mb-2" onClick={handleLogout}>❌ Log out</li>
        </ul>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
            <h4>Are you sure you want to log out?</h4>
            <div className="modal-actions">
              <button onClick={cancelLogout} className="btn btn-secondary">No</button>
              <button onClick={confirmLogout} className="btn btn-danger">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
