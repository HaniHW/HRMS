import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/auth/forgot-password", { email });

      if (response.status === 200 && email) {
        localStorage.setItem("email", email);
        navigate("/otp", { state: { email } }); // ✅ Navigate to OTP page with email
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="left-section">
        <img
          src={require("../assets/illustration.png")}
          alt="Illustration"
          className="illustration"
        />
      </div>
      <div className="right-section">
        <h2>Forgot Password?</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="next-btn" disabled={loading}>
            {loading ? "Sending..." : "Next"}
          </button>
        </form>
        
        <span className="back-link" onClick={() => navigate("/")}>
          Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
