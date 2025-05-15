// backend/routes/notifications.js

const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const notificationsController = require("../controllers/notificationsController");

// Get all notifications for the logged-in user
router.get("/", protect, notificationsController.getAllNotifications);

// Mark a notification as read
router.patch("/:id/read", protect, notificationsController.markAsRead);

module.exports = router;
