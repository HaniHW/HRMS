import React, { useState } from 'react';
import './AddJob.css';

const AddJob = ({ onClose, onAdd }) => {
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [amount, setAmount] = useState('');
  

  const handleAdd = () => {
    const newJob = { department, title, location, amount};
    onAdd(newJob);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Job</h3>

        {/* Department */}
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Testing">Testing</option>
          <option value="Project Management">Project Management</option>
          <option value="System Administration">System Administration</option>
          <option value="Marketing">Marketing</option>
        </select>

        {/* Job Title */}
        <input
          type="text"
          placeholder="Enter Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Location */}
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          <option value="New York, USA">Remote</option>
          <option value="California, USA">On-Site</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Job Type */}
       
        {/* Buttons */}
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="add-btn" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
