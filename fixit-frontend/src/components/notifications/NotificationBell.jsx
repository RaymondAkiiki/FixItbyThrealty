import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/notification");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/notification/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Failed to mark notification as read.");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative"
        aria-label="Toggle notifications"
      >
        <Bell />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded p-2 z-50">
          <h4 className="font-bold mb-2">Notifications</h4>
          {loading && <p className="text-sm text-gray-500">Loading...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && notifications.length === 0 && !error && (
            <p className="text-sm text-gray-500">No notifications.</p>
          )}
          {!loading &&
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={`p-2 rounded cursor-pointer ${
                  n.isRead ? "bg-gray-100" : "bg-blue-100"
                }`}
              >
                <p className="text-sm">{n.message}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;