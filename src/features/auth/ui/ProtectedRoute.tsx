// src/features/auth/ui/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/authStore";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, initializeAuth } = useAuthStore();

  // Initialize auth state if not already done (e.g., on direct access)
  React.useEffect(() => {
    if (user === null && isLoading === true) { // Only initialize if user is null and still loading
      initializeAuth();
    }
  }, [user, isLoading, initializeAuth]);

  if (isLoading) {
    return <div>Carregando autenticação...</div>; // Or a proper loading spinner
  }

  if (!user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
