const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');

// Route to get punch-in data
router.get('/dashboard', DashboardController.getPunchInData);

module.exports = router;
