const ScheduledMaintenance = require("../models/ScheduledMaintenance");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, propertyId, scheduledDate } = req.body;

  // Input validation
  if (!title || !propertyId || !scheduledDate) {
    return res.status(400).json({ error: "Title, propertyId, and scheduledDate are required" });
  }

  try {
    const task = new ScheduledMaintenance({
      ...req.body,
      createdBy: req.user._id, // Ensure the task is tied to the authenticated user
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tasks for the user with filtering and pagination
exports.getUserTasks = async (req, res) => {
  const { status, recurring, page = 1, limit = 10 } = req.query; // Query parameters for filtering and pagination
  const filter = { createdBy: req.user._id };

  // Add filtering options
  if (status) filter.status = status; // Filter by status
  if (recurring !== undefined) filter.recurring = recurring === "true"; // Filter by recurring tasks

  try {
    const tasks = await ScheduledMaintenance.find(filter)
      .populate("assignedTo")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ScheduledMaintenance.countDocuments(filter); // Total count for pagination
    res.status(200).json({ tasks, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await ScheduledMaintenance.findOne({ _id: id, createdBy: req.user._id }).populate("assignedTo");

    if (!task) return res.status(404).json({ error: "Task not found or not authorized" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await ScheduledMaintenance.findOneAndUpdate(
      { _id: id, createdBy: req.user._id }, // Ensure the user owns the task
      req.body,
      { new: true, runValidators: true } // Return the updated task and run schema validation
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found or not authorized" });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
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