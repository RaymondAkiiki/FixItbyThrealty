// TenantCard.jsx - Individual tenant card
import React from 'react';

const TenantCard = ({ tenant, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{tenant.name}</h3>
      <p>Email: {tenant.email}</p>
      <p>Phone: {tenant.phone}</p>
      <p>Unit: {tenant.unit}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onEdit(tenant)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
        <button onClick={() => onDelete(tenant._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
      </div>
    </div>
  );
};

export default TenantCard;