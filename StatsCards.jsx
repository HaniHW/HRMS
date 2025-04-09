import React from "react";

const StatsCards = () => {
  const stats = [
    { title: "Total Employees", value: 560 },
    { title: "Total Applicants", value: 1050 },
    { title: "Today Attendance", value: 470 },
    { title: "Total Projects", value: 250 }
  ];

  return (
    <div className="row my-3">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3">
          <div className="card p-0 text-center shadow-sm">
            <h5>{stat.title}</h5>
            <h3>{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
