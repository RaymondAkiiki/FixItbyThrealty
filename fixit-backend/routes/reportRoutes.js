const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getReportData } = require("../controllers/reportController");

// Report generation route
router.get("/", protect, getReportData);

module.exports = router;