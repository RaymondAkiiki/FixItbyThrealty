
// PropertyTable.jsx
import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyTable = ({ properties }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
            ))}
        </div>
    );
};

export default PropertyTable;