import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import Eye icons*

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password
        // Remove role from frontend submission
      });
  
      const { token,redirectTo } = response.data;
  
      // Store only token in localStorage
      localStorage.setItem("token", token);
      
      // Redirect based on backend response
      navigate(redirectTo);
  
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed!");
    }
  };
  
  // Remove the role select dropdown from your form

  /*const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
        role, // role bhi backend bhejna hoga agar zarurat ho
      });

      const { token, role: returnedRole, redirectTo } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", returnedRole);

      alert("Login successful!");

      if (returnedRole === "Admin") {
        navigate(redirectTo || "/dashboard");
      } else if (returnedRole === "Employee") {
        navigate(redirectTo || "/All-Employee");
      } else {
        setError("Invalid role!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something Went Wrong!");
    }
  };*/

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
        <h2>Welcome Back!</h2>
        <p>Login to your account</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-style"
          />
          
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-style"
          />
            <span 
              className="eye-icon" 
              onClick={() => setShowPassword(!showPassword)} // Toggle the state
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon change based on state */}
            </span>
       

          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div className="div1">
            <span
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
