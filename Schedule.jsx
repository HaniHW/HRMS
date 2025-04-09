import React from "react";

const Schedule = () => {
  const tasks = [
    { time: "09:30", title: "Practical Task Review" },
    { time: "10:15", title: "Resume Review" },
    { time: "11:00", title: "Sales Meeting" },
    { time: "11:30", title: "Final Hand Over" }
  ];

  return (
    <div className="card p-4">
      <h5>My Schedule</h5>
      <ul className="list-unstyled">
        {tasks.map((task, index) => (
          <li key={index} className="mb-2">
            <strong>{task.time}</strong> - {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
