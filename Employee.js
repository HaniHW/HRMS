const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    dateOfBirth: { type: String, required: true },

    jobTitle: { type: String, required: true },
    employmentType: { type: String, required: true },
    department: { type: String, required: true },
    joiningDate: { type: String, required: true },
    workLocation: { type: String, required: true },
    salary: { type: Number, required: true },
    
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'employee'],
        default: 'employee',
        required: true 
      }
 })
module.exports = mongoose.model('Employee', employeeSchema);
