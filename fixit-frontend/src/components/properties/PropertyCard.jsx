// PropertyCard.jsx
import React from "react";

const PropertyCard = ({ property }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Units:</strong> {property.units}</p>
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Status:</strong> {property.status}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
                View Details
            </button>
        </div>
    );
};

export default PropertyCard;

