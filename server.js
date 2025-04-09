require('dotenv').config();  // Load environment variables
const express = require('express');
const connectDB = require('./config/db');  // Import the MongoDB connection
const cors = require("cors");

require('dotenv').config({ path: './.env' });

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("PORT:", process.env.PORT);

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Import the central router (index.routes.js)
const indexRoutes = require('./routes/index.routes');

// Use the central routes file
app.use('/', indexRoutes);  // All routes from index.routes.js will be handled here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
