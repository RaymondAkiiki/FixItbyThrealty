import React, { useEffect, useState } from "react";
import { getAllNotifications, markAsRead } from "../../services/notificationService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Alert from "../../components/common/Alert";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError("Failed to mark notification as read. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {error && <Alert type="error" message={error} />}

      {notifications.length === 0 ? (
        <p>No notifications at the moment.</p>
      ) : (
        <ul className="bg-white rounded shadow p-4">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={`flex justify-between items-center mb-3 p-3 rounded ${
                notif.isRead ? "bg-gray-200" : "bg-blue-50"
              }`}
            >
              <div>
                <p className="font-semibold">{notif.message}</p>
                <small className="text-gray-500">
                  {new Date(notif.createdAt).toLocaleString()}
                </small>
              </div>

              {!notif.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notif._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded ml-4"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
