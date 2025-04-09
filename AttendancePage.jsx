import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AttendancePage = () => {
  const [attendanceData] = useState([
    { id: 1, name: "Ali Khan", date: "2025-03-14", status: "Present" },
    { id: 2, name: "Sara Ahmed", date: "2025-03-14", status: "Absent" },
    { id: 3, name: "Zara Sheikh", date: "2025-03-14", status: "Present" },
    { id: 4, name: "John Doe", date: "2025-03-14", status: "Present" },
    { id: 5, name: "Asad Mehmood", date: "2025-03-14", status: "Absent" },
    { id: 6, name: "Saman Qayum", date: "2025-03-14", status: "Absent" },
    { id: 7, name: "Yashal", date: "2025-03-14", status: "Late" }
  ]);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Employee Attendance</h2>

        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-center">#</th>
                <th className="p-3 text-center">Employee Name</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">{record.name}</td>
                  <td className="p-3 text-center">{record.date}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      record.status === "Present"
                        ? "text-success"
                        : record.status === "Absent"
                        ? "text-danger"
                        : "text-warning"
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {attendanceData.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No attendance records available.</p>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
