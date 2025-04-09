const Attendance = require('../models/Attendance');

exports.punchIn = async (req, res) => {
  try {
    const attendance = new Attendance({
      employeeId: req.user.id,
      type: 'in',
      date: new Date()
    });
    
    await attendance.save();
    res.json({ message: 'Punched in successfully', data: attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.punchOut = async (req, res) => {
  try {
    const attendance = new Attendance({
      employeeId: req.user.id,
      type: 'out',
      date: new Date()
    });
    
    await attendance.save();
    res.json({ message: 'Punched out successfully', data: attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};