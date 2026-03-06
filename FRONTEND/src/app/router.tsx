import { lazy, Suspense, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AUTH_SESSION_EXPIRED_EVENT } from '@/features/auth/model/authSlice';
import { useAuthStore } from '@/features/auth/model/authStore';
import ProtectedRoute from '@/features/auth/ui/ProtectedRoute';
import SessionPolicyBanner from '@/features/auth/ui/SessionPolicyBanner';
import { Spinner } from '@/shared/ui/Spinner';

// essas linhas fazem o carregamento dinâmico do componente HomePage e outros, permitindo que eles só sejam baixados quando necessário, o que melhora a performance da aplicação.
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const CampaignsPage = lazy(() => import('../pages/CampaignsPage'));
const GamePage = lazy(() => import('../pages/GamePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NewGamePage = lazy(() => import('../pages/NewGamePage'));

export default function AppRouter() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleSessionExpired = async () => {
      const hasAuthenticatedUser = Boolean(useAuthStore.getState().user);
      if (!hasAuthenticatedUser) {
        return;
      }

      await logout();
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => {
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, [logout]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <SessionPolicyBanner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/games/new" element={<NewGamePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
