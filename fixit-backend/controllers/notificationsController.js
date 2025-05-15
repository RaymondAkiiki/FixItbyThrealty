// backend/controllers/notificationsController.js

const Notification = require("../models/Notification");

// Get all notifications for a user
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

// Create a new notification (optional, if you'll send notifications server-side)
exports.createNotification = async (recipientId, message, link = "") => {
  try {
    const notification = new Notification({
      recipient: recipientId,
      message,
      link,
    });
    await notification.save();
    console.log("Notification created:", notification);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
