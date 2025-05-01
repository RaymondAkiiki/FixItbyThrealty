import { useState, useEffect } from "react";
import axios from "../api/axios";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

const ReportsPage = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", status: "" });

  const fetchData = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`/reports?${query}`);
    setRequests(res.data);
  };

  const downloadCSV = () => {
    const csvData = requests.map(req => ({
      Title: req.title,
      Status: req.status,
      Created: new Date(req.createdAt).toLocaleDateString(),
      Vendor: req.vendor?.name || "Unassigned",
      AssignedTo: req.assignedTo?.name || "N/A",
    }));
    return csvData;
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Maintenance Reports</h1>

      <div className="flex gap-4 mb-4">
        <input type="date" onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} />
        <input type="date" onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} />
        <select onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={fetchData} className="bg-blue-500 text-white px-4 rounded">Filter</button>
      </div>

      <div className="mb-4">
        <CSVLink data={downloadCSV()} filename="maintenance_report.csv" className="bg-green-500 text-white px-4 py-1 rounded">
          Download CSV
        </CSVLink>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Status</th>
            <th>Created</th>
            <th>Assigned To</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id} className="border-t">
              <td>{req.title}</td>
              <td>{req.status}</td>
              <td>{new Date(req.createdAt).toLocaleDateString()}</td>
              <td>{req.assignedTo?.name || "N/A"}</td>
              <td>{req.vendor?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
