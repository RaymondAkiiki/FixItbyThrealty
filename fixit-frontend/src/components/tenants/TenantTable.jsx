// TenantTable.jsx - Table view of all tenants
import React from 'react';
import TenantCard from './TenantCard';

const TenantTable = ({ tenants, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tenants.map((tenant) => (
        <TenantCard key={tenant._id} tenant={tenant} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TenantTable;