// Unauthorized.js
import React from 'react';
import './Unauthorized.css';  // Import CSS for styling

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h2 className="unauthorized-title">Unauthorized Access</h2>
        <p className="unauthorized-message">
          You do not have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <a href="/" className="unauthorized-link">Go to Home</a>
      </div>
    </div>
  );
};

export default Unauthorized;
