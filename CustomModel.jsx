import React from "react";
import "./CustomModel.css"; // Make sure to create this CSS file for modal styling

const CustomModel = ({ show, onClose, title, message, onStatusClick }) => {
  if (!show) return null; // If show is false, do not render the modal

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h5>{title}</h5>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <p>{message}</p>
        </div>
        <div className="custom-modal-footer">
          <button className="btn btn-primary" onClick={onStatusClick}>
            Status
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModel;
