const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");
const { createEmployee, getEmployee } = require("../controllers/admin.controllers");


router.post("/Add-employee", auth, authorizeRoles("admin"), createEmployee);
router.get("/All-employee",getEmployee);

module.exports = router;
