const express = require("express");
const ScheduledMaintenance = require("../models/ScheduledMaintenance");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Controller: Create task
const createTask = async (req, res) => {
  const {
    title,
    description,
    propertyId,
    scheduledDate,
    recurring,
    frequency,
    reminderDate,
    assignedTo,
  } = req.body;

  const task = new ScheduledMaintenance({
    title,
    description,
    propertyId,
    scheduledDate,
    recurring,
    frequency,
    reminderDate,
    assignedTo,
    createdBy: req.user._id, // Auth middleware attaches user
  });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller: Get user tasks
const getUserTasks = async (req, res) => {
  try {
    const tasks = await ScheduledMaintenance.find({
      createdBy: req.user._id,
    }).populate("assignedTo");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Routes
router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getUserTasks);

module.exports = router;
