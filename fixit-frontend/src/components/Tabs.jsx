// /src/components/requests/Tabs.jsx
import React, { useState } from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Requests", "Ongoing", "Pending", "Completed", "Archived"];

  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4 text-sm font-semibold ${
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          } hover:text-blue-500`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
