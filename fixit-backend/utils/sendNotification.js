const Notification = require("../models/Notification");

const sendNotification = async (recipientId, message, link = "") => {
  try {
    await Notification.create({
      recipient: recipientId,
      message,
      link,
    });
  } catch (error) {
    console.error("Notification Error:", error.message);
  }
};

module.exports = sendNotification;
