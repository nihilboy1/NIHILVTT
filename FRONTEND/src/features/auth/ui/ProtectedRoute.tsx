// src/features/auth/ui/ProtectedRoute.tsx

import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/authStore';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore();

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
