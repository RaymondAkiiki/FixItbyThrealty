import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="h-16 flex justify-between items-center px-6 border-b bg-white shadow-sm">
      {/* Toggle Sidebar Button (Only visible on small screens) */}
      <button
        onClick={toggleSidebar}
        className="text-blue-600 text-lg font-bold md:hidden"
      >
        ☰
      </button>

      {/* Welcome Message */}
      <h1 className="text-lg font-medium text-gray-700">
        Welcome, {user?.name}
      </h1>

      {/* Logout Button */}
      <div className="flex items-center gap-4">
        <button className="text-sm text-red-600" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;