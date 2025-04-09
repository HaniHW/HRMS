const Dashboard = require('../models/Dashboard'); 

exports.getPunchInData = async (req, res) => {
  try {
    const punchInData = await Dashboard.findOne({ employeeId: req.user.id }); // Get the data based on employee ID

    if (!punchInData) {
      return res.status(404).json({ error: 'Punch-in data not found' });
    }

    const { punchInTime, hoursWorked } = punchInData; 
    res.json({ punchInTime, hoursWorked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
