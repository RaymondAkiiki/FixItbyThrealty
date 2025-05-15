import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import RequestTabs from "../../components/requests/RequestTabs";
import RequestTable from "../../components/requests/RequestTable";

const RequestsPage = () => {
  const [currentTab, setCurrentTab] = useState("All");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/requests");
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filtered = requests.filter((r) => {
    if (currentTab !== "All" && r.status !== currentTab) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4">Maintenance Requests</h2>

      {/* Tabs */}
      <RequestTabs currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search requests"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Content */}
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filtered.length === 0 ? (
        <p>No requests found for the selected filters.</p>
      ) : (
        <RequestTable requests={filtered} />
      )}
    </MainLayout>
  );
};

export default RequestsPage;