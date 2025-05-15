import api from "./api";

// Fetch tenant details by ID
export const getTenantById = async (id) => {
  try {
    const response = await api.get(`/api/tenants/${id}`);
    return response.data; // Return tenant data
  } catch (err) {
    console.error(`Error fetching tenant with ID ${id}:`, err);
    throw err; // Re-throw the error for the calling function to handle
  }
};

// Add a new tenant
export const addTenant = async (tenantData) => {
  try {
    const response = await api.post(`/api/tenants`, tenantData);
    return response.data; // Return the response data (e.g., created tenant)
  } catch (err) {
    console.error("Error adding new tenant:", err);
    throw err; // Re-throw the error for the calling function to handle
  }
};

// Update an existing tenant by ID
export const updateTenant = async (id, tenantData) => {
  try {
    const response = await api.put(`/api/tenants/${id}`, tenantData);
    return response.data; // Return the updated tenant data
  } catch (err) {
    console.error(`Error updating tenant with ID ${id}:`, err);
    throw err; // Re-throw the error for the calling function to handle
  }
};