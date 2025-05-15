import React from "react";
import { Link } from "react-router-dom";

const RequestCard = ({ request }) => {
  const statusStyles = {
    Pending: "bg-yellow-500 text-white",
    "In Progress": "bg-blue-500 text-white",
    Completed: "bg-green-500 text-white",
    Default: "bg-gray-500 text-white",
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {request.title || "Untitled Request"}
        </h3>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            statusStyles[request.status] || statusStyles.Default
          }`}
          aria-label={`Status: ${request.status}`}
        >
          {request.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm">
        {request.description?.length > 100
          ? `${request.description.slice(0, 100)}...`
          : request.description || "No description available."}
      </p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">
          Category: {request.category || "Uncategorized"}
        </span>
        <Link
          to={`/requests/${request._id}`}
          className="text-sm text-blue-500 hover:underline"
          aria-label={`View details for ${request.title}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RequestCard;