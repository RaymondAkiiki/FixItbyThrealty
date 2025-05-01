const express = require("express");
const router = express.Router();
const { protect, authorizeRoles} = require("../middleware/authMiddleware");
const { getReportData } = require("../controllers/reportController");

router.get("/", protect, getReportData);

module.exports = router;
