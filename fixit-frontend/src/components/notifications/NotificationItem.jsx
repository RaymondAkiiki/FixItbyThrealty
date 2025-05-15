import React from 'react';

const NotificationItem = ({ notification, onClick }) => {
    return (
        <div 
            className={`p-4 mb-2 rounded-lg shadow cursor-pointer ${notification.isRead ? 'bg-gray-100' : 'bg-blue-50'}`} 
            onClick={() => onClick(notification)}
        >
            <p className="font-semibold text-gray-800">{notification.message}</p>
            {notification.link && <a href={notification.link} className="text-blue-600 underline">View Details</a>}
            <p className="text-sm text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default NotificationItem;
