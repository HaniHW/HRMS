const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Authentication Fields (common for all users)
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'employee'], 
    default: 'employee',
    required: true
  },
  
  // Account Management Fields
  isActive: { 
    type: Boolean, 
    default: true 
  },
  otp: { 
    type: String 
  },
  otpExpires: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },

  // Employee Specific Fields (nullable for admins)
  employeeId: { 
    type: String, 
    unique: true, 
    sparse: true  // Allows null for admins
  },
  firstName: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  lastName: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  contactNumber: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  gender: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  nationality: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  dateOfBirth: { 
    type: Date,  // Changed from String to Date
    required: function() { return this.role === 'employee'; }
  },
  jobTitle: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  employmentType: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  department: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  joiningDate: { 
    type: Date,  // Changed from String to Date
    required: function() { return this.role === 'employee'; }
  },
  workLocation: { 
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  salary: { 
    type: Number,
    required: function() { return this.role === 'employee'; }
  },

 
}, { timestamps: true });

// Add index for better query performance
userSchema.index({ email: 1, role: 1 });

module.exports = mongoose.model("User", userSchema);



/*const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'employee'], // Only lowercase
    default: 'employee',
    required: true
  },
  otp: { type: String },
  otpExpires: { type: Date }
});

module.exports = mongoose.model("User", userSchema);*/
