import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenantForm from "../../components/tenants/TenantForm";
import { getTenantById, addTenant, updateTenant } from "../../services/tenantService";

// EditTenantPage.jsx
export const EditTenantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenantData, setTenantData] = useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const data = await getTenantById(id);
        setTenantData(data);
      } catch (err) {
        console.error("Failed to fetch tenant details", err);
      }
    };

    fetchTenant();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateTenant(id, formData);
      navigate(`/tenants/${id}`);
    } catch (err) {
      console.error("Failed to update tenant", err);
    }
  };

  if (!tenantData) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Tenant</h1>
      <TenantForm onSubmit={handleSubmit} initialData={tenantData} />
    </div>
  );
};
export default EditTenantPage;