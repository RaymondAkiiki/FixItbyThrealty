const ScheduledMaintenance = require("../models/ScheduledMaintenance");

// Create new task
exports.createTask = async (req, res) => {
  try {
    const task = new ScheduledMaintenance({ ...req.body, createdBy: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tasks for the user
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await ScheduledMaintenance.find({ createdBy: req.user._id }).populate("assignedTo");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
