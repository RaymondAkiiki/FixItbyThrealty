import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Requests", path: "/dashboard/requests" },
    { label: "Reports", path: "/dashboard/reports" },
    ...(user?.role === "property_manager" || user?.role === "landlord"
      ? [{ label: "Vendors", path: "/dashboard/vendors" }]
      : []),
    { label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Fixit Dashboard</h2>
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded hover:bg-blue-50 ${
                pathname === item.path ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
