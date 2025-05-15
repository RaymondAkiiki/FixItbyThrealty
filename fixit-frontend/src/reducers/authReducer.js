const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case "USER_LOGIN_FAIL":
    case "USER_REGISTER_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};