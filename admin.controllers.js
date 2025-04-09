const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createEmployee = async (req, res) => {
  try {
    console.log("🚀 Incoming Request to Add Employee");
    console.log("📦 Request body:", req.body);
    console.log("👤 Logged-in Admin:", req.user);

    const { email, password, ...employeeData } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ Employee already exists:", existingUser.email);
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    // Create new employee
    const newEmployee = new User({
      email,
      password: hashedPassword,
      role: "Employee", // Ensure this remains "Employee"
      ...employeeData,
      createdBy: req.user._id // This comes from token
    });

    await newEmployee.save();
    console.log("✅ New employee saved:", newEmployee.email);

    res.status(201).json({
      success: true,  // 👈 Add this line
      message: "Employee created successfully",
      employee: newEmployee
    });

    
  } catch (err) {
    console.error("❌ Error in createEmployee:", err.message);
    res.status(500).json({ message: "Error creating employee", error: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    console.log("📥 Fetching all employees");
    const employees = await User.find({ role: 'employee' });  // Find only users with role 
    console.log(employees);

    const updatedEmployees = employees.map(emp => ({
      ...emp._doc,
      name: `${emp.firstName} ${emp.lastName}`,
    }));

    console.log(`👨‍💼 Total Employees Fetched: ${updatedEmployees.length}`);
    res.status(200).json(updatedEmployees);
  } catch (error) {
    console.error("❌ Error in getEmployee:", error.message);
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};


// Function to fetch all employees
 // Function to fetch all employees


 /*
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
};
*/