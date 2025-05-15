import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenantForm from "../../components/tenants/TenantForm";
import { getTenantById, addTenant, updateTenant } from "../../services/tenantService";

// TenantDetailsPage.jsx
export const TenantDetailsPage = () => {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const data = await getTenantById(id);
        setTenant(data);
      } catch (err) {
        console.error("Failed to fetch tenant details", err);
      }
    };

    fetchTenant();
  }, [id]);

  if (!tenant) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Tenant Details</h1>
      <p><strong>Name:</strong> {tenant.name}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
      <p><strong>Phone:</strong> {tenant.phone}</p>
      <p><strong>Property:</strong> {tenant.property}</p>
      <p><strong>Unit:</strong> {tenant.unit}</p>
    </div>
  );
};
export default TenantDetailsPage;