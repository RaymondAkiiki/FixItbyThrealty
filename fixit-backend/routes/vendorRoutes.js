// backend/routes/vendorRoutes.js

const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const vendorController = require("../controllers/vendorController");

// Get all vendors
router.get("/", protect, vendorController.getAllVendors);

// Add a new vendor
router.post("/", protect, vendorController.addVendor);

// Update vendor details
router.put("/:id", protect, vendorController.updateVendor);

// Delete a vendor
router.delete("/:id", protect, vendorController.deleteVendor);

module.exports = router;
