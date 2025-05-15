import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermission } from "../context/PermissionContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { hasPermission } = usePermission();

  // Show loading indicator while authentication state is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check role-based access
  if (allowedRoles && !hasPermission(allowedRoles)) {
    return <div className="p-6 text-red-600">Access Denied</div>;
  }

  return children;
};

export default ProtectedRoute;