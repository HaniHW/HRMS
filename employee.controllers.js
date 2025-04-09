
/*const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee with hashed password
    const newEmployee = new Employee({
      ...rest,
      password: hashedPassword,
      role: rest.role?.toLowerCase() || "employee"
    });

    await newEmployee.save();

    res.status(201).json({ 
      success: true, 
      message: "Employee added successfully", 
      data: newEmployee 
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to add employee", 
      error: error.message 
    });
  }
};



// Function to fetch all employees
 // Function to fetch all employees
exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    
    // Combine firstName and lastName to create full name
    const updatedEmployees = employees.map(emp => ({
      ...emp._doc, // Copy other properties
      name: `${emp.firstName} ${emp.lastName}`, // Combine firstName and lastName
    }));

    res.status(200).json(updatedEmployees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};*/