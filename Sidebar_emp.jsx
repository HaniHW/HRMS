import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>HRMS</h2>
      <nav>
        <ul>
          <li>
            <NavLink end to="/" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/attendance" className="nav-link">
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink to="/payroll" className="nav-link">
              Payroll
            </NavLink>

 

          </li>
          <li>
            <NavLink to="/leaves" className="nav-link">
              Leaves
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="nav-link">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
