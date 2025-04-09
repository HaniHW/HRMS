import React from 'react';
import './Holidays.css';
import Sidebar from './Sidebar';

const Holidays = () => {
  const holidays = [
    { date: 'January 01, 2023', day: 'Tuesday', name: 'New Year' },
    { date: 'January 07, 2023', day: 'Saturday', name: 'International Programmers\' Day' },
    { date: 'February 04, 2023', day: 'Saturday', name: 'World Cancer Day' },
    { date: 'April 01, 2023', day: 'Saturday', name: 'April Fool Day' },
    { date: 'May 07, 2023', day: 'Monday', name: 'International Programmers\' Day' },
    { date: 'May 22, 2023', day: 'Tuesday', name: 'International Day for Biological Diversity' },
    { date: 'June 05, 2023', day: 'Monday', name: 'International Day for Biological Diversity' },
    { date: 'August 07, 2023', day: 'Monday', name: 'International Friendship Day' },
    { date: 'September 15, 2023', day: 'Friday', name: 'International Day of Democracy' },
    { date: 'November 14, 2023', day: 'Tuesday', name: 'World Diabetes Day' },
    { date: 'December 25, 2023', day: 'Monday', name: 'Merry Christmas' },
  ];

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <div className="header">
          <div>
            <h2>Holidays</h2>
            <p>All Holiday Lists</p>
          </div>
          <div className="search-profile">
            <input type="text" placeholder="Search" className="search-box" />
            <div className="profile">
              <span>Sarah</span>
              <p>HR Manager</p>
            </div>
          </div>
        </div>

        <div className="actions">
          <input type="text" placeholder="Search" className="search-box" />
          <button className="add-btn">Add New Holiday</button>
        </div>

        <table className="holiday-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Holiday Name</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.date}</td>
                <td>{holiday.day}</td>
                <td>{holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="status-labels">
          <span className="upcoming">● Upcoming</span>
          <span className="past">● Past Holidays</span>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
