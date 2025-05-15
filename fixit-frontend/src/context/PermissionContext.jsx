import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const PermissionContext = createContext();

export const usePermission = () => {
  return useContext(PermissionContext);
};

export const PermissionProvider = ({ children }) => {
  const { user } = useAuth();

  const hasPermission = (rolesRequired) => {
    if (!Array.isArray(rolesRequired)) {
      rolesRequired = [rolesRequired]; // Convert single role to array
    }
    return rolesRequired.includes(user?.role); // Check if user role matches
  };

  return (
    <PermissionContext.Provider value={{ hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};