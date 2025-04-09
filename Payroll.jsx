import React from 'react';
import Sidebar from './Sidebar'; // Include Sidebar
import './Payroll.css';


const payrollData = [
  { name: 'Leslie Watson', ctc: '$45000', salary: '$3500', deduction: '-', status: 'Completed' },
  { name: 'Darkine Robertson', ctc: '$78000', salary: '$6400', deduction: '$100', status: 'Completed' },
  { name: 'Jacob Jones', ctc: '$60000', salary: '$5000', deduction: '$250', status: 'Completed' },
  { name: 'Kathryn Murphy', ctc: '$34000', salary: '$2800', deduction: '-', status: 'Pending' },
  { name: 'Leslie Alexander', ctc: '$40000', salary: '$3400', deduction: '-', status: 'Completed' },
  { name: 'Ronald Richards', ctc: '$45000', salary: '$3500', deduction: '-', status: 'Pending' },
  { name: 'Guy Hawkins', ctc: '$55000', salary: '$4000', deduction: '$50', status: 'Pending' },
  { name: 'Albert Flores', ctc: '$60000', salary: '$5000', deduction: '$150', status: 'Completed' },
];

const Payroll = () => {
  return (
    <div className="main-container">
      <Sidebar /> {/* Sidebar included here */}

      <div className="content">
        {/* Header Section */}
        <div className="header">
          <div>
            <h2>Payroll</h2>
            <p>All Employee Payroll</p>
          </div>
          <input type="text" placeholder="Search" className="search-box" />
        </div>

        {/* Search and Export Button */}
        <div className="search-export">
          <input type="text" placeholder="Search Employee" />
          <button className="export-btn">Export</button>
        </div>

        {/* Payroll Table */}
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>CTC</th>
              <th>Salary Per Month</th>
              <th>Deduction</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.ctc}</td>
                <td>{item.salary}</td>
                <td>{item.deduction}</td>
                <td>
                  <span className={`status-badge ${item.status === 'Completed' ? 'completed' : 'pending'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
