import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import Tabs from "../../components/Tabs"; // Reusable Tabs Component
import DashboardFilters from "./DashboardFilters"; // Reusable Filters Component

const tabs = [
  { name: "All", disabled: false },
  { name: "Pending", disabled: false },
  { name: "In Progress", disabled: false },
  { name: "Completed", disabled: false },
  { name: "Archived", disabled: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState({ status: "", search: "", date: "" });
  const [requests, setRequests] = useState([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingMaintenance, setLoadingMaintenance] = useState(false);
  const [error, setError] = useState("");

  // Fetch requests
  const fetchRequests = async () => {
    setLoadingRequests(true);
    setError("");
    try {
      const params = {
        ...(activeTab !== "All" && { status: activeTab }),
        ...filters,
      };
      const res = await axios.get("/api/requests/dashboard", { params });
      setRequests(res.data);
    } catch (err) {
      setError("Failed to load requests.");
      console.error(err);
    } finally {
      setLoadingRequests(false);
    }
  };

  // Fetch maintenance tasks
  const fetchMaintenanceTasks = async () => {
    setLoadingMaintenance(true);
    setError("");
    try {
      const res = await axios.get("/api/maintenance");
      setMaintenanceTasks(res.data);
    } catch (err) {
      setError("Failed to load maintenance tasks.");
      console.error(err);
    } finally {
      setLoadingMaintenance(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [activeTab, filters]);

  useEffect(() => {
    fetchMaintenanceTasks();
  }, []);

  const stats = [
    { label: "All", count: requests.length },
    { label: "Pending", count: requests.filter((r) => r.status === "Pending").length },
    { label: "In Progress", count: requests.filter((r) => r.status === "In Progress").length },
    { label: "Completed", count: requests.filter((r) => r.status === "Completed").length },
    { label: "Archived", count: requests.filter((r) => r.status === "Archived").length },
  ];

  return (
    <MainLayout>
      <div className="p-4 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Your Maintenance Overview</h1>
        <p className="mb-6">This is your dashboard. You’ll see recent requests, alerts, and actions here.</p>

        {/* Tabs for Navigation */}
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Stats Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white shadow-md p-4 rounded-md text-center">
              <h4 className="font-semibold">{stat.label}</h4>
              <p className="text-xl">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <DashboardFilters filters={filters} setFilters={setFilters} />

        {/* Requests Table */}
        <div className="bg-white shadow-md rounded p-4">
          {loadingRequests ? (
            <p>Loading requests...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Assigned</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="border-t hover:bg-gray-100 cursor-pointer">
                    <td>{req.title}</td>
                    <td>{req.status}</td>
                    <td>{req.priority}</td>
                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td>{req.assignedTo ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Scheduled Maintenance Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Scheduled Maintenance</h2>
          {loadingMaintenance ? (
            <p>Loading maintenance tasks...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : maintenanceTasks.length === 0 ? (
            <p className="text-gray-500">No scheduled maintenance tasks.</p>
          ) : (
            maintenanceTasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-xl">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">
                  Scheduled for: {new Date(task.scheduledDate).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
