import React from "react";

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
      <h5>Hello Sarah 👋</h5>
      <div>
        <input type="text" className="form-control d-inline w-50" placeholder="Search..." />
        <span className="ms-0">👤 Sarah</span>
      </div>
    </div>
  );
};

export default Header;
