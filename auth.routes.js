const express = require("express");

const { login,forgotPassword,verifyOtp,resetPassword} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/login",login);
router.post('/forgot-password', forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;

