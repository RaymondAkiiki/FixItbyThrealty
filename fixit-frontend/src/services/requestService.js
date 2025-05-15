// /src/services/requestService.js
import api from "./api";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/requests`;

// Get token from localStorage
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllRequests = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

export const getRequestById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, authHeader());
  return response.data;
};

export const createRequest = async (formData) => {
  const response = await axios.post(API_URL, formData, authHeader());
  return response.data;
};

export const updateRequest = async (id, updates) => {
  const response = await axios.put(`${API_URL}/${id}`, updates, authHeader());
  return response.data;
};

export const markAsResolved = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/resolve`, {}, authHeader());
  return response.data;
};

export const assignVendor = async (id, vendorData) => {
  const response = await axios.patch(`${API_URL}/${id}/assign`, vendorData, authHeader());
  return response.data;
};

export const deleteRequest = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/archive`, {}, authHeader());
  return response.data;
};
