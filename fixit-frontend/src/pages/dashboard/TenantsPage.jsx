

import React, { useEffect, useState } from 'react';
import TenantTable from "../../components/tenants/TenantTable";
import TenantCard from '../../components/tenants/TenantCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { getTenantById, addTenant, updateTenant } from '../../services/tenantService';

const TenantsPage = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenantById();
        setTenants(data);
      } catch (err) {
        setError('Failed to fetch tenants');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const handleDelete = async (tenantId) => {
    try {
      await updateTenant(tenantId);
      setTenants(tenants.filter((tenant) => tenant._id !== tenantId));
    } catch (err) {
      setError('Failed to delete tenant');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tenants</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Button text="Add Tenant" onClick={() => console.log('Add Tenant')} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TenantTable tenants={tenants} onDelete={handleDelete} />
      )}
      <Pagination totalItems={tenants.length} itemsPerPage={10} />
    </div>
  );
};

export default TenantsPage;