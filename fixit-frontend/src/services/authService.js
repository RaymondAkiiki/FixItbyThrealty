import axios from "axios";

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth", { email, password });
    localStorage.setItem("token", data.token); // Store JWT in localStorage
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.user });
  } catch (err) {
    localStorage.removeItem("token"); // Clear token if login fails
    dispatch({ type: "USER_LOGIN_FAIL", payload: err.response?.data?.message || "Login failed" });
  }
};

// Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove the token from localStorage
  dispatch({ type: "USER_LOGOUT" }); // Reset the user state in Redux
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth/", userData);
    localStorage.setItem("token", data.token); // Store JWT in localStorage
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data.user });
  } catch (err) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: err.response?.data?.message || "Registration failed" });
  }
};

// Validate Token (Session Persistence)
export const validateToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get("/api/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.user });
    } else {
      dispatch({ type: "USER_LOGOUT" });
    }
  } catch (err) {
    localStorage.removeItem("token");
    dispatch({ type: "USER_LOGOUT" });
  }
};