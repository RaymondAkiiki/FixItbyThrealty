import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import RequestTabs from "../../components/requests/RequestTabs";
import RequestTable from "../../components/requests/RequestTable";

// Temp data
const sampleRequests = [
  { _id: "1", title: "Leaking tap", status: "Pending", createdAt: Date.now(), priority: "High" },
  { _id: "2", title: "Broken lock", status: "Ongoing", createdAt: Date.now(), priority: "Low" },
];

const RequestsPage = () => {
  const [currentTab, setCurrentTab] = useState("All");

  const filtered = sampleRequests.filter((r) =>
    currentTab === "All" ? true : r.status === currentTab
  );

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4">Maintenance Requests</h2>
      <RequestTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      <RequestTable requests={filtered} />
    </MainLayout>
  );
};

export default RequestsPage;
