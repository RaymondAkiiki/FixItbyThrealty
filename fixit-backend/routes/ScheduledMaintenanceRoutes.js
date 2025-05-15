const express = require("express");
const ScheduledMaintenance = require("../models/ScheduledMaintenance");
const { protect } = require("../middleware/authMiddleware");
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

  // Validation example
  if (!title || !propertyId || !scheduledDate) {
    return res.status(400).json({ error: "Title, propertyId, and scheduledDate are required" });
  }

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

// Controller: Get user tasks (with filtering and pagination)
const getUserTasks = async (req, res) => {
  const { status, recurring, page = 1, limit = 10 } = req.query;
  const filter = { createdBy: req.user._id };

  if (status) filter.status = status; // Optional filtering by status
  if (recurring !== undefined) filter.recurring = recurring === "true"; // Optional filtering by recurring

  try {
    const tasks = await ScheduledMaintenance.find(filter)
      .populate("assignedTo")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await ScheduledMaintenance.countDocuments(filter);
    res.status(200).json({ tasks, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await ScheduledMaintenance.findOneAndUpdate(
      { _id: id, createdBy: req.user._id }, // Ensure the user owns the task
      updates,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found or not authorized" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller: Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await ScheduledMaintenance.findOneAndDelete({
      _id: id,
      createdBy: req.user._id, // Ensure the user owns the task
    });

    if (!deletedTask) return res.status(404).json({ error: "Task not found or not authorized" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Routes
router.post("/", protect, createTask);
router.get("/", protect, getUserTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;