// backend/controllers/vendorController.js

const Vendor = require("../models/Vendor");

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new vendor
exports.addVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    console.error("Error adding vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update vendor details
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(vendor);
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};
