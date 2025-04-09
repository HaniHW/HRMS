import React, { useState, useEffect } from "react";
import "./OtpScreen.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios

const OtpScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    console.log("📌 Retrieved Email:", storedEmail); // ✅ Debugging log
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please request OTP again.");
    }
  }, []);

  const handleChange = (index, e) => {
    let value = e.target.value;

    // ✅ Only allow numbers
    if (!/^\d*$/.test(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // ✅ Move focus to next box (except last box)
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    console.log("📌 Submitting OTP:", enteredOtp);
    console.log("📌 Using Email:", email);

    if (!email) {
      setError("Email not found. Please request OTP again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", {
        email,
        otp: enteredOtp,
      });

      console.log("✅ OTP Verification Success:", response.data);
      navigate("/ResetPassword");

    } catch (error) {
      console.error("❌ OTP Verification Failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", ""]); // ✅ Clear OTP input on failure
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
        <h2>Enter OTP</h2>
        <p>Please enter the OTP sent to your email</p>
        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="button" className="otp-btn" onClick={handleSubmit}>
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default OtpScreen;
