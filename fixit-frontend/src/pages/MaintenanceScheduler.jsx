import React, { useState } from "react";
import axios from "axios";

const MaintenanceScheduler = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyId, setPropertyId] = useState(""); // This would be fetched from user properties
  const [scheduledDate, setScheduledDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [reminderDate, setReminderDate] = useState("");
  const [assignedTo, setAssignedTo] = useState(""); // Assign technician or vendor

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = {
        title,
        description,
        propertyId,
        scheduledDate,
        recurring,
        frequency,
        reminderDate,
        assignedTo,
      };

      await axios.post("/api/maintenance", newTask);
      alert("Maintenance scheduled successfully!");
    } catch (err) {
      console.error(err);
      alert("Error scheduling maintenance.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border rounded-md"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Recurring</label>
          <input
            type="checkbox"
            checked={recurring}
            onChange={() => setRecurring(!recurring)}
          /> Yes
        </div>
        {recurring && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              className="mt-1 block w-full p-2 border rounded-md"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Reminder Date</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border rounded-md"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assign Technician/Vendor</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded-md"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
          Schedule Maintenance
        </button>
      </form>
    </div>
  );
};

export default MaintenanceScheduler;
