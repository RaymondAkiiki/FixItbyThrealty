// /src/components/requests/RequestCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const RequestCard = ({ request }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{request.title}</h3>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            request.status === "Pending"
              ? "bg-yellow-500 text-white"
              : request.status === "In Progress"
              ? "bg-blue-500 text-white"
              : request.status === "Completed"
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {request.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{request.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">Category: {request.category}</span>
        <Link
          to={`/requests/${request._id}`}
          className="text-sm text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RequestCard;
