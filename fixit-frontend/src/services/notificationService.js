import api from "../api/axios";

// Get all notifications for the logged-in user
export const getAllNotifications = async () => {
  try {
    const res = await api.get("/notifications");
    return res.data;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    throw err;
  }
};

// Mark a notification as read
export const markAsRead = async (notificationId) => {
  try {
    const res = await api.patch(`/notifications/${notificationId}/read`);
    return res.data;
  } catch (err) {
    console.error("Error marking notification as read:", err);
    throw err;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
  try {
    const res = await api.delete(`/notifications/${notificationId}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting notification:", err);
    throw err;
  }
};
