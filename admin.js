const mongoose = require('mongoose');
const User = require('./models/User');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const seedAdmin = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/HRMS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existingAdmin = await User.findOne({ email: 'admin@example.com' });
  if (existingAdmin) {
    console.log('Admin already exists!');
    return;
  }


const admin = new User({
  name: 'saman qayum',
  email: 'admin@example.com',
  password:await bcryptjs.hash('password123', 10), // Hash password before saving "password123",// await bcryptjs.hash('password123', saltRounds), // Hashing the password
  role: 'admin',
});

  

  await admin.save();
  console.log('Admin added successfully!');
  await mongoose.disconnect();
};

seedAdmin().catch((error) => {
  console.error('Error seeding admin:', error);
});
