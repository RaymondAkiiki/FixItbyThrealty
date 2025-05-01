// /src/pages/dashboard/Settings.jsx
import React, { useState } from "react";
import UserService from "../../services/UserService";

const Settings = () => {
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    notifications: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveSettings = async () => {
    try {
      await UserService.updateUserSettings(settings);
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <h3 className="text-xl">Account Settings</h3>
        <input
          type="email"
          name="email"
          className="border p-2 mb-2 w-full"
          placeholder="Email Address"
          value={settings.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="border p-2 mb-2 w-full"
          placeholder="New Password"
          value={settings.password}
          onChange={handleInputChange}
        />
        <label className="block mt-2">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleInputChange}
          />
          Receive Email Notifications
        </label>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

// SettingsPage.jsx
export default function SettingsPage() {
  return <div>Settings Page</div>;
}

