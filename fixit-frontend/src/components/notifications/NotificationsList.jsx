import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationsList = ({ notifications, onNotificationClick }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications available.</p>
            ) : (
                notifications.map((notification) => (
                    <NotificationItem 
                        key={notification._id} 
                        notification={notification} 
                        onClick={onNotificationClick} 
                    />
                ))
            )}
        </div>
    );
};

export default NotificationsList;
