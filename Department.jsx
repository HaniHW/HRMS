import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Department.css';

const departments = [
  {
    name: 'Design Department',
    members: 20,
    people: ['Dianne Russell', 'Aline McCoy', 'Cody Fisher', 'Theresa Webb', 'Ronald Richards'],
  },
  {
    name: 'Sales Department',
    members: 14,
    people: ['Darrell Steward', 'Kristin Watson', 'Courtney Henry', 'Kathryn Murphy', 'Albert Flores'],
  },
  {
    name: 'Project Management Department',
    members: 10,
    people: ['Leslie Alexander', 'Ronald Richards', 'Savannah Nguyen', 'Eleanor Pena', 'Esther Howard'],
  },
  {
    name: 'Marketing Department',
    members: 10,
    people: ['Wade Warren', 'Brooklyn Simmons', 'Kristin Watson', 'Jacob Jones', 'Cody Fisher'],
  },
  {
    name: 'Development Department',
    members: 10,
    people: ['Wade Warren', 'Brooklyn Simmons', 'Kristin Watson', 'Jacob Jones', 'Cody Fisher'],
  },
  {
    name: 'HR  Department',
    members: 10,
    people: ['Wade Warren', 'Brooklyn Simmons', 'Kristin Watson', 'Jacob Jones', 'Cody Fisher'],
  },
  {
    name: 'Testing Department',
    members: 10,
    people: ['Wade Warren', 'Brooklyn Simmons', 'Kristin Watson', 'Jacob Jones', 'Cody Fisher'],
  },
  {
    name: 'System Administration Department',
    members: 10,
    people: ['Wade Warren', 'Brooklyn Simmons', 'Kristin Watson', 'Jacob Jones', 'Cody Fisher'],
  },
  {
    name: 'Finance Department',
    members: 10,
    people: ['Wade Warren', 'Brooklyn Simmons', 'Kristin Watson', 'Jacob Jones', 'Cody Fisher'],
  }
];

const Department = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department => {
    // Filter by department name or member's name
    return (
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.people.some(person => person.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="main-container">
      <Sidebar />

      <div className="content">
        {/* Header */}
        <div className="header">
          <div>
            <h2>All Departments</h2>
            <p>All Departments Information</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term as the user types
          />
        </div>

        {/* Departments */}
        <div className="departments-container">
          {filteredDepartments.length === 0 ? (
            <p>No results found</p> // Show this if no departments match the search term
          ) : (
            filteredDepartments.map((dept, index) => (
              <div className="department-card" key={index}>
                <div className="department-header">
                  <h3>{dept.name}</h3>
                  <span>{dept.members} Members</span>
                  <span className="view">View All</span>
                </div>
                <ul className="department-members">
                  {dept.people.map((person, idx) => (
                    <li key={idx}>
                      <span className="profile-icon">👨‍💼</span> {person}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;
