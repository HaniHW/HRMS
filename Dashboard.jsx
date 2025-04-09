import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCards from "./StatsCards";
import TaskChart from "./TaskChart";
import Schedule from "./Schedule";
import AttendanceOverview from "./AttendanceOverview";

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="col-md-10 p-2">
        {/* Header */}
        <Header />
        {/* Stats Cards */}
        <StatsCards />
        {/* Task Progress & Schedule */}
        <div className="row">
          <div className="col-md-7">
            <TaskChart />
          </div>
          <div className="col-md-5">
            <Schedule />
          </div>
        </div>
        {/* Attendance Overview */}
        <AttendanceOverview />
      </div>
    </div>
  );
};

export default Dashboard;
