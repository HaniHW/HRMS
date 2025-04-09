import React from "react";
import "./Attendence.css";

const Attendence = () => {
  return (
    <div className="attendance">
      <h3>Attendance</h3>
      <p>Punch In at</p>
      <h2>08:55 AM</h2>
      <div className="circle">
        <p>Total Hours</p>
        <h3>04:30:00</h3>
      </div>
      <button className="punch-out">Punch Out</button>
    </div>
  );
};

export default Attendence;
