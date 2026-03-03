import { useEffect, useMemo, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/model/authStore';
import { loadAccessTokenExpiryFromStorage } from '@/features/auth/model/authTokenStorage';

const PUBLIC_PATHS = new Set(['/', '/login', '/register']);
const EXPIRY_WARNING_THRESHOLD_MS = 300_000;
const SESSION_EXPIRING_TOAST_ID = 'session-expiring-warning';
const SESSION_EXPIRED_TOAST_ID = 'session-expired-warning';

function formatRemaining(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

export default function SessionPolicyBanner() {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  const [expiresAtMs, setExpiresAtMs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const hasShownExpiringToastRef = useRef(false);
  const hasShownExpiredToastRef = useRef(false);

  useEffect(() => {
    const syncSession = () => {
      setExpiresAtMs(loadAccessTokenExpiryFromStorage());
      setNowMs(Date.now());
    };

    syncSession();
    const interval = window.setInterval(syncSession, 15_000);
    window.addEventListener('focus', syncSession);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', syncSession);
    };
  }, []);

  const isPublicRoute = PUBLIC_PATHS.has(location.pathname);
  const remainingMs = useMemo(() => {
    if (!expiresAtMs) return null;
    return expiresAtMs - nowMs;
  }, [expiresAtMs, nowMs]);

  useEffect(() => {
    if (isLoading || !user || isPublicRoute) {
      toast.dismiss(SESSION_EXPIRING_TOAST_ID);
      toast.dismiss(SESSION_EXPIRED_TOAST_ID);
      hasShownExpiringToastRef.current = false;
      hasShownExpiredToastRef.current = false;
      return;
    }

    if (remainingMs === null) {
      return;
    }

    const isExpired = remainingMs <= 0;
    const isExpiringSoon = remainingMs <= EXPIRY_WARNING_THRESHOLD_MS;

    if (isExpired) {
      toast.dismiss(SESSION_EXPIRING_TOAST_ID);
      if (!hasShownExpiredToastRef.current) {
        toast.error('Sessão expirada. Tentando renovar automaticamente.', {
          id: SESSION_EXPIRED_TOAST_ID,
          duration: 3000,
        });
        hasShownExpiredToastRef.current = true;
      }
      return;
    }

    if (isExpiringSoon) {
      toast.dismiss(SESSION_EXPIRED_TOAST_ID);
      hasShownExpiredToastRef.current = false;

      if (!hasShownExpiringToastRef.current) {
        toast('Sua sessão expira em breve.', {
          id: SESSION_EXPIRING_TOAST_ID,
          description: `Expira em ${formatRemaining(remainingMs)}. Renovação automática ativa.`,
          duration: 3000,
        });
        hasShownExpiringToastRef.current = true;
      }
      return;
    }

    // Sessão saudável: limpa aviso e permite notificar novamente no próximo ciclo de expiração.
    toast.dismiss(SESSION_EXPIRING_TOAST_ID);
    toast.dismiss(SESSION_EXPIRED_TOAST_ID);
    hasShownExpiringToastRef.current = false;
    hasShownExpiredToastRef.current = false;
  }, [isLoading, isPublicRoute, remainingMs, user]);

  return null;
}
