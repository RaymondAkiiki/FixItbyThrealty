// /src/context/PermissionContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PermissionContext = createContext();

export const usePermission = () => {
  return useContext(PermissionContext);
};

export const PermissionProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from backend or localStorage
    const role = localStorage.getItem("userRole"); // Assume this is stored after login
    setUserRole(role);
  }, []);

  const hasPermission = (roleRequired) => {
    return userRole === roleRequired;
  };

  return (
    <PermissionContext.Provider value={{ hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
