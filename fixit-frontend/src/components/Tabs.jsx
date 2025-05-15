import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      // Move to the next tab, wrap around if needed
      const nextIndex = (index + 1) % tabs.length;
      if (!tabs[nextIndex].disabled) {
        setActiveTab(tabs[nextIndex].name);
      }
    } else if (e.key === "ArrowLeft") {
      // Move to the previous tab, wrap around if needed
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      if (!tabs[prevIndex].disabled) {
        setActiveTab(tabs[prevIndex].name);
      }
    }
  };

  return (
    <div className="flex space-x-4 border-b" role="tablist">
      {tabs.map((tab, index) => (
        <button
          key={tab.name}
          onClick={() => !tab.disabled && setActiveTab(tab.name)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`py-2 px-4 text-sm font-semibold ${
            tab.disabled
              ? "text-gray-400 cursor-not-allowed"
              : activeTab === tab.name
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          role="tab"
          aria-selected={activeTab === tab.name}
          aria-disabled={tab.disabled}
          aria-label={`Tab: ${tab.name}`}
          tabIndex={tab.disabled ? -1 : 0} // Make disabled tabs unfocusable
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;