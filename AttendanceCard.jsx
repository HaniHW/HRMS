import React from "react";
import "../styles/Attendance.css";

const AttendanceCard = ({ arrivalTime, hoursWorked }) => {
  return (
    <div className="attendance-card">
      <p className="arrival-time">
        Punch In at <strong>{arrivalTime}</strong>
      </p>
      <div className="circle">
        <div className="circle-content">
          <span>Total Hours</span>
          <h3>{hoursWorked}</h3>
        </div>
      </div>
      <button className="punch-out-btn">Punch Out</button>
    </div>
  );
};

export default AttendanceCard;
