// src/services/vendorService.js

import api from "./api";

// Fetch all vendors
export const getAllVendors = async () => {
  try {
    const res = await api.get("/vendors");
    return res.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};


// Get a single vendor by ID
export const getVendorById = async (vendorId) => {
  try {
    const response = await api.get(`/vendors/${vendorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendor by ID:", error);
    throw error;
  }
};

// Add a new vendor
export const addVendor = async (vendorData) => {
  try {
    const res = await api.post("/vendors", vendorData);
    return res.data;
  } catch (error) {
    console.error("Error adding vendor:", error);
    throw error;
  }
};

// Update vendor details
export const updateVendor = async (vendorId, vendorData) => {
  try {
    const res = await api.put(`/vendors/${vendorId}`, vendorData);
    return res.data;
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error;
  }
};

// Delete a vendor
export const deleteVendor = async (vendorId) => {
  try {
    const res = await api.delete(`/vendors/${vendorId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw error;
  }
};
