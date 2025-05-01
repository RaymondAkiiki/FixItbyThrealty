// /src/pages/dashboard/DashboardFilters.jsx
import React from "react";

const DashboardFilters = ({ filters, setFilters }) => {
  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleDateChange = (e) => {
    setFilters((prev) => ({ ...prev, date: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  return (
    <div className="flex space-x-4 my-4">
      <div>
        <label htmlFor="status" className="block text-sm font-semibold">
          Status:
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={handleStatusChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-semibold">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={filters.date}
          onChange={handleDateChange}
          className="border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-semibold">
          Category:
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Structural">Structural</option>
          <option value="Pest Control">Pest Control</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardFilters;
