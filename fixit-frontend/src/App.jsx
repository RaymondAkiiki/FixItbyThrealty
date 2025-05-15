import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Import Welcome Page
import WelcomePage from "./pages/WelcomePage";

// Import Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// Import Dashboard Pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import VendorsPage from "./pages/dashboard/VendorsPage";
import RequestsPage from "./pages/dashboard/RequestsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import TenantsPage from "./pages/dashboard/TenantsPage";
import PropertiesPage from "./pages/dashboard/PropertiesPage";

// Import Tenant Pages
import TenantDetailsPage from "./pages/tenants/TenantDetailsPage";
import AddTenantPage from "./pages/tenants/AddTenantPage";
import EditTenantPage from "./pages/tenants/EditTenantPage";

// Import Vendor Pages
import VendorDetailsPage from "./pages/vendors/VendorDetailsPage";
import AddVendorPage from "./pages/vendors/AddVendorPage";
import EditVendorPage from "./pages/vendors/EditVendorPage";

// Import Error Pages
import NotFoundPage from "./pages/errors/NotFoundPage";
import AccessDeniedPage from "./pages/errors/AccessDeniedPage";

// Import Layout Components
import MainLayout from "./components/layout/MainLayout";

// Import Protected Route Component
import ProtectedRoute from "./routes/ProtectedRoute";

// Import Request Detail Page
import RequestDetailPage from "./pages/requests/RequestDetail";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["property_manager", "landlord"]}>
                <MainLayout>
                  <ReportsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendors"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <VendorsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <RequestsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <RequestDetailPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <NotificationsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenants"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <TenantsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <PropertiesPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Tenant Management Routes */}
          <Route
            path="/tenants/details/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <TenantDetailsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenants/add"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AddTenantPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenants/edit/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EditTenantPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Vendor Management Routes */}
          <Route
            path="/vendors/details/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <VendorDetailsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendors/add"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AddVendorPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendors/edit/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EditVendorPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Error Pages */}
          <Route path="/403" element={<AccessDeniedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;