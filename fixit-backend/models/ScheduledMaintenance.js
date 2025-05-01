const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  scheduledDate: { type: Date, required: true },
  recurring: { type: Boolean, default: false },
  frequency: { type: String, enum: ["weekly", "monthly", "quarterly", "yearly"], default: "monthly" },
  reminderDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("ScheduledMaintenance", maintenanceSchema);
