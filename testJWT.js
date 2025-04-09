const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjE1NjBmNzNjZDI5NjdjMjhlZGFkNSIsInJvbGUiOiJlbXBsb3llZSIsImlhdCI6MTc0MzkxNDQ1MSwiZXhwIjoxNzQzOTIxNjUxfQ.blp29T4R7Pz94GWEwvFATw7OWI953nqT3lm9pobzAGs";
const secret = "secretkey123!";

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token verified successfully:", decoded);
} catch (err) {
  console.error("❌ Invalid Token:", err.message);
}
