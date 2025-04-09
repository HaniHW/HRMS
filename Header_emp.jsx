import React from 'react';
import '../styles/Header.css';

const Header = ({ employeeName }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h1>{`Hello ${employeeName} 👋`}</h1>
        <p>Good Morning</p>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-input" />
        {/* You can use a local image from assets or an online URL */}
        <img 
          src="https://randomuser.me/api/portraits/women/50.jpg" 
          alt="Profile" 
          className="header-profile-img" 
        />
      </div>
    </div>
  );
};

export default Header;
