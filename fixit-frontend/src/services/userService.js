import api from "./api";

// --- Auth ---
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/users/register", userData);
    return res.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/users/login", credentials);
    return res.data;
  } catch (err) {
    console.error("Error logging in user:", err);
    throw err;
  }
};

// --- Profile ---
export const getUserProfile = async () => {
  try {
    const res = await api.get("/users/profile");
    return res.data;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    throw err;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const res = await api.put("/users/profile", profileData);
    return res.data;
  } catch (err) {
    console.error("Error updating user profile:", err);
    throw err;
  }
};

// --- Admin Actions ---
export const getAllUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    console.error("Error fetching user list:", err);
    throw err;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const res = await api.patch(`/users/${userId}/role`, { role });
    return res.data;
  } catch (err) {
    console.error("Error updating user role:", err);
    throw err;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await api.delete(`/users/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};

// --- Password Reset ---
export const requestPasswordReset = async (email) => {
  try {
    const res = await api.post("/users/reset-password/request", { email });
    return res.data;
  } catch (err) {
    console.error("Error requesting password reset:", err);
    throw err;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await api.post(`/users/reset-password/${token}`, {
      password: newPassword,
    });
    return res.data;
  } catch (err) {
    console.error("Error resetting password:", err);
    throw err;
  }
};