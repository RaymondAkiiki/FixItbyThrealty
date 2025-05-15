import React from "react";

const DashboardFilters = ({
  filters,
  setFilters,
  statusOptions = ["Pending", "In Progress", "Completed", "Archived"],
  categoryOptions = ["Plumbing", "Electrical", "Structural", "Pest Control"],
}) => {
  // Generic handler for filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({ status: "", date: "", category: "" });
  };

  return (
    <div className="flex flex-wrap items-center space-x-4 my-4">
      {/* Status Filter */}
      <div>
        <label htmlFor="status" className="block text-sm font-semibold">
          Status:
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="border p-2 rounded w-full"
          aria-label="Filter by status"
        >
          <option value="">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filter */}
      <div>
        <label htmlFor="date" className="block text-sm font-semibold">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="border p-2 rounded w-full"
          aria-label="Filter by date"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-semibold">
          Category:
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="border p-2 rounded w-full"
          aria-label="Filter by category"
        >
          <option value="">All</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters Button */}
      <div>
        <button
          onClick={resetFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          aria-label="Reset all filters"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;