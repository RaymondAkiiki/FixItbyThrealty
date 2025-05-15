const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const { register, login, getAdminData } = require('../controllers/authController'); // ✅ FIXED LINE
const {
  forgotPassword,
  resetPassword,
  validateToken,
} = require("../controllers/authController");

router.post('/register', register);
router.post('/login', login);
router.get("/admin-data", protect, authorizeRoles("admin"), getAdminData);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/validate-token", validateToken);

module.exports = router;
