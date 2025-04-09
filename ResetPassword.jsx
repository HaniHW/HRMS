import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      setError("Email not found. Please try again.");
      return;
    }

    try {
      console.log("Sending request to backend...", { email, newPassword, confirmPassword });

      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });

      console.log("Server Response:", response.data);
      setSuccess(response.data.message);
      setError("");

      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="screen">
      <div className="left-section">
        <img src={require("../assets/illustration.png")} alt="Illustration" className="illustration" />
      </div>
      <div className="right-section">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>        
          <input type="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
         
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
