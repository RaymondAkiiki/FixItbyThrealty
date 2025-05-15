import api from "./api";

// --- Get All Properties ---
export const getAllProperties = async () => {
  try {
    const res = await api.get("/properties");
    return res.data;
  } catch (err) {
    console.error("Error fetching properties:", err);
    throw err;
  }
};

// --- Get Single Property ---
export const getPropertyById = async (propertyId) => {
  try {
    const res = await api.get(`/properties/${propertyId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching property:", err);
    throw err;
  }
};

// --- Create New Property ---
export const createProperty = async (propertyData) => {
  try {
    const res = await api.post("/properties", propertyData);
    return res.data;
  } catch (err) {
    console.error("Error creating property:", err);
    throw err;
  }
};

// --- Update Property ---
export const updateProperty = async (propertyId, propertyData) => {
  try {
    const res = await api.put(`/properties/${propertyId}`, propertyData);
    return res.data;
  } catch (err) {
    console.error("Error updating property:", err);
    throw err;
  }
};

// --- Delete Property ---
export const deleteProperty = async (propertyId) => {
  try {
    const res = await api.delete(`/properties/${propertyId}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting property:", err);
    throw err;
  }
};

// --- Search Properties ---
export const searchProperties = async (query) => {
  try {
    const res = await api.get(`/properties/search?query=${encodeURIComponent(query)}`);
    return res.data;
  } catch (err) {
    console.error("Error searching properties:", err);
    throw err;
  }
};

export default {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
};
