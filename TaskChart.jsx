import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "June", Completed: 80, Progress: 15, NotStarted: 5 },
  { month: "July", Completed: 75, Progress: 20, NotStarted: 5 },
  { month: "Aug", Completed: 85, Progress: 10, NotStarted: 5 },
  { month: "Sep", Completed: 90, Progress: 8, NotStarted: 2 },
  { month: "Oct", Completed: 95, Progress: 4, NotStarted: 1 },
  { month: "Nov", Completed: 98, Progress: 2, NotStarted: 0 },
];

const TaskChart = () => {
  return (
    <div className="card p-3">
      <h5>Rate Completing Tasks</h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" fill="#4CAF50" />
          <Bar dataKey="Progress" fill="#FFC107" />
          <Bar dataKey="NotStarted" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
