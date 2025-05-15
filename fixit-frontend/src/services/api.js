import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true, // Enables cookies for session-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to safely retrieve the token
const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.warn("localStorage is not available:", error);
    return null;
  }
};

// Request Interceptor: Automatically attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global response errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response, // Pass successful responses directly
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors by logging out the user
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Pass the error to the calling code
  }
);

export default api;