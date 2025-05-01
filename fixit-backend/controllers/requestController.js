const Request = require("../models/Request");
const AuditLog = require("../models/AuditLog");

// Create a maintenance request with audit logging
exports.createRequest = async (req, res) => {
  try {
    const { title, description, category, priority, images } = req.body;

    const newRequest = await Request.create({
      title,
      description,
      category,
      priority,
      images,
      createdBy: req.user._id,
      tenantRef: req.user._id
    });

    await AuditLog.create({
      action: "CREATE",
      user: req.user._id,
      targetModel: "Request",
      targetId: newRequest._id
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create request." });
  }
};

// Get all user-related requests
exports.getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [
        { createdBy: req.user._id },
        { assignedTo: req.user._id }
      ]
    }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a comment to a request
exports.addComment = async (req, res) => {
  const { requestId, message } = req.body;
  try {
    const request = await Request.findById(requestId);
    request.comments.push({
      sender: req.user._id,
      message
    });
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update request status
exports.updateStatus = async (req, res) => {
  const { requestId, status } = req.body;
  try {
    const request = await Request.findById(requestId);
    request.status = status;
    if (status === 'Completed') request.resolvedAt = new Date();
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get filtered requests (for dashboard)
exports.getFilteredRequests = async (req, res) => {
  try {
    const { status, createdBy, assigned, search, startDate, endDate } = req.query;

    const query = {};

    // Role-based visibility
    if (req.user.role === 'Tenant') {
      query.tenantRef = req.user._id;
    } else if (req.user.role === 'Landlord' || req.user.role === 'PM') {
      query.$or = [
        { createdBy: req.user._id },
        { assignedTo: req.user._id }
      ];
    }

    if (status) query.status = status;
    if (createdBy) query.createdBy = createdBy;
    if (assigned === 'true') query.assignedTo = { $ne: null };
    if (assigned === 'false') query.assignedTo = null;
    if (search) query.title = { $regex: search, $options: 'i' };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const requests = await Request.find(query).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit feedback for a completed request
exports.submitFeedback = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only submit feedback for your own request." });
    }

    if (request.status !== "Completed") {
      return res.status(400).json({ message: "Feedback can only be submitted after completion." });
    }

    request.feedback = {
      rating,
      comment,
      submittedAt: new Date(),
    };

    await request.save();
    res.json({ message: "Feedback submitted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
