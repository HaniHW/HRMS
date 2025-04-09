const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("👉 Incoming Token:", token); // <-- Add this
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  


  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {

     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user data in request
   
    next();

  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { auth, authorizeRoles };
