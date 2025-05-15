import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  // State for form inputs and UI states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes dynamically
  const handleChange = (setter) => (e) => setter(e.target.value);

  // Validate inputs (basic client-side validation)
  const validateInputs = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!validateInputs()) {
      return;
    }

    setLoading(true); // Set loading state
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { user } = response.data; // Assume the API returns { user: { id, name, email, role }, token }
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user)); // Persist data if "Remember Me" is checked
      }
      login(user); // Use AuthContext to log in the user

      // Navigate based on role
      switch (user.role) {
        case "tenant":
          navigate("/tenant-dashboard");
          break;
        case "landlord":
          navigate("/landlord-dashboard");
          break;
        case "manager":
          navigate("/pm-dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (err) {
      // Handle errors gracefully
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Unable to connect. Please check your network.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Navigate to the Register page
  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to your registration page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Fixit</h2>

        {/* Error Message */}
        {error && (
          <p
            className="text-red-500 text-sm text-center"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {/* Email Input */}
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={handleChange(setEmail)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              aria-label="Email"
            />

            {/* Password Input */}
            <input
              type="password"
              required
              value={password}
              onChange={handleChange(setPassword)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register Option */}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;