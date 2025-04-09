const User = require('../models/User');
const Employee = require('../models/Employee');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Check in User model first (for both admins and employees)
    let user = await User.findOne({ email });

    // If user exists in User model
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials!" });
      }

      // Generate token with consistent role naming
      const token = jwt.sign(
        { id: user._id, role: user.role }, // Use user.role from database
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      
      console.log("Token being generated with secret:", process.env.JWT_SECRET);

      return res.json({
        token,
        message: `${user.role} Login Successful!`,
        role: user.role,
        redirectTo: user.role === 'admin' ? "/dashboard" : "/All-Employee"
      });
    }

    // Step 2: If not in User model, check Employee model
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Verify employee password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    // Create user account if doesn't exist
    if (!user) {
      user = new User({
        email: employee.email,
        password: employee.password,
        role: employee.role // Use the role from employee record
      });
      await user.save();
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      message: `${user.role} Login Successful!`,
      role: user.role,
      redirectTo: user.role === 'admin' ? "/dashboard" : "/All-Employee"
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message });
  }
};

   

///FORGOT PASSWORD 
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email); // ✅ Debugging Step 1

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found!"); // ✅ Debugging Step 2
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    
    console.log("After saving - OTP stored:", user.otp);  // ✅ Debugging Step 4
    await user.save({ validateBeforeSave: false });
    console.log("OTP Generated:", otp); // ✅ Debugging Step 3

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email sending error:", error); // ✅ Debugging Step 4
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent successfully:", info.response); // ✅ Debugging Step 5
      res.json({ message: "OTP sent to email" });
    });
  } catch (error) {
    console.log("Error in forgot password:", error); // ✅ Debugging Step 6
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.verifyOtp = async (req, res) => {
  console.log("Received data:", req.body);  // ✅ Debugging Step 1

  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
      console.log("User not found in database"); // ✅ Debugging Step 2
      return res.status(400).json({ message: "User not found" });
  }

  console.log("User Found:", user.email);
  console.log("Stored OTP in DB:", user.otp); // ✅ Debugging Step 3
  console.log("User's OTP Expiry Time:", user.otpExpires);
  console.log("Current Time:", new Date());

  if (user.otp !== otp) {
      console.log("OTP Mismatch! Entered:", otp, "Expected:", user.otp); // ✅ Debugging Step 4
      return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() > user.otpExpires) {
      console.log("OTP Expired!"); // ✅ Debugging Step 5
      return res.status(400).json({ message: "Expired OTP" });
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "OTP verified, proceed to reset password" });
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
