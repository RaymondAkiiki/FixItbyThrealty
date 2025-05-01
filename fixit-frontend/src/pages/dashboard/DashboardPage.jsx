import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../components/layout/MainLayout'; // Import MainLayout

const tabs = ['All', 'Pending', 'In Progress', 'Completed', 'Archived'];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ assigned: '', createdBy: '', startDate: '', endDate: '' });

  const [selectedStatus, setSelectedStatus] = useState('');
  const [assignedFilter, setAssignedFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [maintenanceTasks, setMaintenanceTasks] = useState([]); // 🆕 Scheduled Maintenance state

  const fetchRequests = async () => {
    try {
      const params = {
        ...(activeTab !== 'All' && { status: activeTab }),
        ...filters,
        ...(search && { search })
      };
      const res = await axios.get('/api/requests/dashboard', { params });
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to load requests', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [activeTab, filters, search]);

  // 🆕 Fetch scheduled maintenance
  useEffect(() => {
    const fetchMaintenanceTasks = async () => {
      try {
        const response = await axios.get("/api/maintenance");
        setMaintenanceTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch maintenance tasks", error);
      }
    };

    fetchMaintenanceTasks();
  }, []);

  const getStatusCount = (status) =>
    requests.filter((req) => req.status === status).length;

  const stats = [
    { label: "All", count: requests.length },
    { label: "Pending", count: getStatusCount("pending") },
    { label: "In Progress", count: getStatusCount("in_progress") },
    { label: "Completed", count: getStatusCount("completed") },
    { label: "Archived", count: getStatusCount("archived") },
  ];

  const filteredRequests = requests
    .filter((r) => {
      if (selectedStatus && r.status !== selectedStatus) return false;
      if (assignedFilter === "assigned" && !r.assignedTo) return false;
      if (assignedFilter === "unassigned" && r.assignedTo) return false;
      if (dateFilter && r.createdAt?.slice(0, 10) !== dateFilter) return false;
      if (
        searchQuery &&
        !(
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
        return false;
      return true;
    });

  return (
    <MainLayout>
      <div className="p-4 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Your Maintenance Overview</h1>
        <p className="mb-6">This is your dashboard. You’ll see recent requests, alerts, and actions here.</p>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Dashboard</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">+ New Request</button>
        </div>

        <div className="flex space-x-4 mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-3 py-1 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🧩 STATS WIDGETS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white shadow-md p-4 rounded-md text-center"
            >
              <h4 className="font-semibold">{stat.label}</h4>
              <p className="text-xl">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* 🧩 FILTERS */}
        <div className="flex flex-wrap items-center gap-4 my-4">
          <select
            className="border p-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            className="border p-2"
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <input
            type="date"
            className="border p-2"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {/* 🧩 SEARCH */}
        <input
          className="border p-2 w-full mb-4"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 🧩 OLD SEARCH + DATE RANGE STILL HERE */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="date"
            onChange={e => setFilters({ ...filters, startDate: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            onChange={e => setFilters({ ...filters, endDate: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* 🧩 TABLE */}
        <div className="bg-white shadow-md rounded p-4">
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
              {filteredRequests.map(req => (
                <tr key={req._id} className="border-t hover:bg-gray-100 cursor-pointer">
                  <td>{req.title}</td>
                  <td>{req.status}</td>
                  <td>{req.priority}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td>{req.assignedTo ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🧩 SCHEDULED MAINTENANCE SECTION */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Scheduled Maintenance</h2>
          <div className="space-y-4">
            {maintenanceTasks.length === 0 ? (
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
      </div>
    </MainLayout>
  );
}
