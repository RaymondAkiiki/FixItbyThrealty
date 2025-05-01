export const loginUser = (email, password) => async (dispatch) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);  // Store JWT in localStorage
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.user });
    } catch (err) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: err.response.data.message });
    }
  };
  