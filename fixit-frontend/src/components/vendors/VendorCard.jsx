// VendorCard.jsx - Individual vendor card
import React from "react";

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
      <p className="text-gray-700 mb-1">Contact: {vendor.contact}</p>
      <p className="text-gray-700 mb-1">Email: {vendor.email}</p>
      <p className="text-gray-700 mb-1">Phone: {vendor.phone}</p>
      <p className="text-gray-700 mb-1">Address: {vendor.address}</p>
    </div>
  );
};

export default VendorCard;