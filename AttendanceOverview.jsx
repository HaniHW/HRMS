import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AttendanceOverview = () => {
  const employees = [
    { name: "Leslie Wilson", role: "Team Lead", time: "09:27 AM", status: "Present" },
    { name: "Darlene Robertson", role: "Web Designer", time: "10:15 AM", status: "Late" },
    { name: "Jacob Jones", role: "Dev", time: "10:30 AM", status: "Late" },
    { name: "Kathryn Murphy", role: "Marketing", time: "09:20 AM", status: "Present" }
  ];

  return (
    <div className="card p-3 my-3 shadow-sm rounded" style={{ backgroundColor: "#f8f9fa" }}>
      <h5 className="mb-4 text-center text-primary">Attendance Overview</h5>
      
      <table className="table table-bordered table-striped table-hover" style={{ borderCollapse: "collapse" }}>
        <thead className="table-light">
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Check-In Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: emp.status === "Late" ? "#f9e2e2" : "#e2f9e2",
                color: emp.status === "Late" ? "#d9534f" : "#28a745",
              }}
            >
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.time}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceOverview;
