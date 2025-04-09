import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Jobs.css';
import { useNavigate } from 'react-router-dom';
import AddJob from './AddJob'; // Import your AddJob component

const jobsData = {
  active: [
    { title: 'UI/UX Designer', dept: 'Design', location: 'California, USA', salary: '$3600/Month', tags: ['Design', 'Full Time', 'Remote'] },
    { title: 'Sr. UX Researcher', dept: 'Design', location: 'New York, USA', salary: '$1500/Month', tags: ['Design', 'Full Time'] },
    { title: 'BDM', dept: 'Sales', location: 'New York, USA', salary: '$1000/Month', tags: ['Sales', 'Full Time'] },
    { title: 'React JS', dept: 'Developer', location: 'California, USA', salary: '$2000/Month', tags: ['Developer', 'Full Time'] },
  ],
  inactive: [
    { title: 'HR Executive', dept: 'HR', location: 'California, USA', salary: '$3600/Month', tags: ['HR', 'Full Time', 'Remote'] },
    { title: 'Python Developer', dept: 'Developer', location: 'New York, USA', salary: '$1500/Month', tags: ['Developer', 'Full Time'] },
  ],
  completed: [
    { title: 'UI/UX Designer', dept: 'Design', location: 'California, USA', salary: '$3600/Month', tags: ['Design', 'Full Time', 'Remote'] },
    { title: 'Sr. UX Researcher', dept: 'Design', location: 'New York, USA', salary: '$1500/Month', tags: ['Design', 'Full Time'] },
    { title: 'BDM', dept: 'Sales', location: 'New York, USA', salary: '$1000/Month', tags: ['Sales', 'Full Time'] },
  ],
};

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);  // State to control the modal visibility
  const [jobs, setJobs] = useState(jobsData);  // Store job data

  const navigate = useNavigate();

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to add new job
  const handleAddJob = (newJob) => {
    setJobs({
      ...jobs,
      active: [...jobs.active, newJob],  // Assuming new jobs are added to the active list
    });
    setShowModal(false); // Close the modal after adding a job
  };

  return (
    <div className="main-container">
      <Sidebar />
      <div className={`content ${showModal ? 'overlay' : ''}`}>
        {/* Header */}
        <div className="header">
          <div>
            <h2>Jobs</h2>
            <p>Show All Jobs</p>
          </div>
          <input type="text" placeholder="Search" className="search-box" />
        </div>

        {/* Search Bar and Add Button */}
        <div className="search-add">
          <input type="text" placeholder="Search" />
          <button className="add-btn" onClick={() => setShowModal(true)}>+ Add New Job</button>
        </div>

        {/* Job Columns */}
        <div className="jobs-container">
          <div className="job-column">
            <h3 className="job-column-title active">🟡 Active Jobs</h3>
            {jobs.active.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>

          <div className="job-column">
            <h3 className="job-column-title inactive">🔴 Inactive Jobs</h3>
            {jobs.inactive.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>

          <div className="job-column">
            <h3 className="job-column-title completed">🟢 Completed Jobs</h3>
            {jobs.completed.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {showModal && (
        <AddJob 
          onClose={handleCloseModal} 
          onAdd={handleAddJob} 
        />
      )}
    </div>
  );
};

const JobCard = ({ job }) => (
  <div className="job-card">
    <div className="job-header">
      <h4>{job.title}</h4>
      <span>{job.dept}</span>
    </div>
    <div className="job-tags">
      {job.tags.map((tag, idx) => (
        <span key={idx} className="tag">{tag}</span>
      ))}
    </div>
    <div className="job-footer">
      <span>{job.location}</span>
      <strong>{job.salary}</strong>
    </div>
  </div>
);

export default Jobs;
