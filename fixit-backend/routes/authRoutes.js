const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const { register, login, getAdminData } = require('../controllers/authController'); // ✅ FIXED LINE

router.post('/register', register);
router.post('/login', login);
router.get("/admin-data", protect, authorizeRoles("admin"), getAdminData);

module.exports = router;
