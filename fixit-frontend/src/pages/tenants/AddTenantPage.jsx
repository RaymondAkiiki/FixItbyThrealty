import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenantForm from "../../components/tenants/TenantForm";
import { getTenantById, addTenant, updateTenant } from "../../services/tenantService";

// AddTenantPage.jsx
export const AddTenantPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await addTenant(formData);
      navigate("/tenants");
    } catch (err) {
      console.error("Failed to add tenant", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Tenant</h1>
      <TenantForm onSubmit={handleSubmit} />
    </div>
  );
};
export default AddTenantPage;