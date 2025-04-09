const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Handle POST /push-in
router.post('/push-in', (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming data
    if (!req.body.employerId) {
      return res.status(400).json({ error: "employerId is required" });
    }
    res.json({ status: "Success", employerId: req.body.employerId });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;