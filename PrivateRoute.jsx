import {jwtDecode} from 'jwt-decode'; // ✅ Correct
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("User is not authenticated. Redirecting to login.");
    return <Navigate to="/" />;
  }

  let decoded = null;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.log("Invalid token. Redirecting to login.");
    return <Navigate to="/" />;
  }

  const userRole = decoded.role;

  console.log("Decoded Role:", userRole);

  if (!allowedRoles.includes(userRole)) {
    console.log("User role is not allowed. Redirecting to unauthorized.");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
