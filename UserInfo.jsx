import React from "react";
import "./UserInfo.css";
import profilePic from "../assets/saman.jpg"; // apni image yahan add karein

const UserInfo = () => {
  return (
    <div className="user-info">
      <img src={profilePic} alt="User" className="profile-pic" />
      <div>
        <h3>Hello Olivia 👋</h3>
        <p>Good Morning</p>
      </div>
    </div>
  );
};

export default UserInfo;
