import React, { useState, useEffect } from "react";
import {getUserProfile} from "../../services/UserService";
import { toast } from "react-toastify"; // Notification library

const Settings = () => {
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    notifications: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load existing user settings on mount
    const fetchSettings = async () => {
      try {
        const userSettings = await getUserProfile.getUserSettings();
        setSettings(userSettings);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError("Failed to load settings.");
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateInputs = () => {
    if (!/\S+@\S+\.\S+/.test(settings.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (settings.password && settings.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleSaveSettings = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);
    try {
      await UserService.updateUserSettings(settings);
      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Error saving settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <h3 className="text-xl">Account Settings</h3>
        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border p-2 mb-2 w-full"
            placeholder="Email Address"
            value={settings.email}
            onChange={handleInputChange}
            aria-label="Email address"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-semibold">
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border p-2 mb-2 w-full"
            placeholder="New Password"
            value={settings.password}
            onChange={handleInputChange}
            aria-label="New password"
          />
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleInputChange}
              aria-label="Receive email notifications"
            />
            <span className="ml-2">Receive Email Notifications</span>
          </label>
        </div>
      </div>

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSaveSettings}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default Settings;