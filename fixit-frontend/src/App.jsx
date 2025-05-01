import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RequestsPage from "./pages/dashboard/RequestsPage";
// import ReportsPage from "./pages/dashboard/ReportsPage";
// import VendorsPage from "./pages/dashboard/VendorsPage";
// import SettingsPage from "./pages/dashboard/SettingsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ReportsPage from './pages/dashboard/ReportsPage'; // adjust path if different
import VendorsPage from './pages/dashboard/VendorsPage';
import SettingsPage from './pages/dashboard/SettingsPage';



function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}


<Routes>
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/requests"
    element={
      <ProtectedRoute>
        <RequestsPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/reports"
    element={
      <ProtectedRoute allowedRoles={["property_manager", "landlord"]}>
        <ReportsPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/vendors"
    element={
      <ProtectedRoute allowedRoles={["property_manager", "landlord"]}>
        <VendorsPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/settings"
    element={
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    }
  />
</Routes>;

// src/App.jsx (or wherever routes are defined)
<Route path="/requests/:id" element={<RequestDetailPage />} />




export default App;
