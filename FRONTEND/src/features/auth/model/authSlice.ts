import axios, { InternalAxiosRequestConfig } from 'axios';

import { AuthError, AuthErrorCode, buildAuthError } from './authErrors';
import { User } from './authSchemas';
import {
  loadAccessTokenFromStorage,
  removeAccessTokenFromStorage,
  saveAccessTokenToStorage,
} from './authTokenStorage';

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:8080';

export const AUTH_SESSION_EXPIRED_EVENT = 'nihilvtt:auth-session-expired';

export const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshTokenInFlight: Promise<string> | null = null;

const notifySessionExpired = () => {
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
};

const isAuthBypassEndpoint = (url?: string) => {
  if (!url) return false;
  return ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'].some((path) =>
    url.includes(path),
  );
};

const runRefreshAccessToken = async (): Promise<string> => {
  const response = await refreshApi.post<AuthResponse>('/auth/refresh');
  saveAccessTokenToStorage(response.data.accessToken);
  return response.data.accessToken;
};

const ensureRefreshedAccessToken = async (): Promise<string> => {
  if (!refreshTokenInFlight) {
    refreshTokenInFlight = runRefreshAccessToken().finally(() => {
      refreshTokenInFlight = null;
    });
  }

  return refreshTokenInFlight;
};

authApi.interceptors.request.use((config) => {
  const accessToken = loadAccessTokenFromStorage();
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest || status !== 401 || originalRequest._retry || isAuthBypassEndpoint(originalRequest.url)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await ensureRefreshedAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return authApi(originalRequest);
    } catch (refreshError) {
      removeAccessTokenFromStorage();
      notifySessionExpired();
      return Promise.reject(refreshError);
    }
  },
);

type AuthResponse = {
  accessToken: string;
  user: User;
};

type ReauthResponse = {
  reauthToken: string;
};

type BackendErrorPayload = {
  code?: string;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

const AUTH_ERROR_CODES: AuthErrorCode[] = [
  'VALIDATION_ERROR',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'CONFLICT',
  'NOT_IMPLEMENTED',
  'NETWORK_ERROR',
  'UNKNOWN_ERROR',
];

const toKnownCode = (value: string | undefined, fallback: AuthErrorCode): AuthErrorCode => {
  if (value && AUTH_ERROR_CODES.includes(value as AuthErrorCode)) {
    return value as AuthErrorCode;
  }
  return fallback;
};

const toAuthError = (error: unknown, fallback: string): AuthError => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as BackendErrorPayload | undefined;
    const message = payload?.message || payload?.error || fallback;
    const fieldErrors = payload?.fieldErrors ?? {};
    const status = error.response?.status;

    if (status === 400) {
      return buildAuthError({
        code: toKnownCode(payload?.code, 'VALIDATION_ERROR'),
        formError: message || 'Dados inválidos.',
        fieldErrors,
      });
    }
    if (status === 401) {
      return buildAuthError({
        code: toKnownCode(payload?.code, 'UNAUTHORIZED'),
        formError: message,
        fieldErrors,
      });
    }
    if (status === 403) {
      return buildAuthError({
        code: toKnownCode(payload?.code, 'FORBIDDEN'),
        formError: message,
        fieldErrors,
      });
    }
    if (status === 409) {
      return buildAuthError({
        code: toKnownCode(payload?.code, 'CONFLICT'),
        formError: message,
        fieldErrors,
      });
    }
    if (status === 429) {
      return buildAuthError({
        code: toKnownCode(payload?.code, 'UNKNOWN_ERROR'),
        formError: message,
        fieldErrors,
      });
    }
    if (status == null) {
      return buildAuthError({
        code: 'NETWORK_ERROR',
        formError: 'Não foi possível conectar ao servidor.',
        fieldErrors: {},
      });
    }
    return buildAuthError({
      code: toKnownCode(payload?.code, 'UNKNOWN_ERROR'),
      formError: message,
      fieldErrors,
    });
  }

  if (error instanceof AuthError) return error;
  if (error instanceof Error && error.message) {
    return buildAuthError({ code: 'UNKNOWN_ERROR', formError: error.message, fieldErrors: {} });
  }
  return buildAuthError({ code: 'UNKNOWN_ERROR', formError: fallback, fieldErrors: {} });
};

const persistAuthSession = (response: AuthResponse): User => {
  saveAccessTokenToStorage(response.accessToken);
  return response.user;
};

export async function registerUser(userData: { name: string; email: string; password: string }) {
  try {
    const response = await authApi.post<AuthResponse>('/auth/register', userData);
    return persistAuthSession(response.data);
  } catch (error) {
    throw toAuthError(error, 'Falha ao registrar usuário.');
  }
}

export async function loginUser(credentials: { email: string; password: string }) {
  try {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    return persistAuthSession(response.data);
  } catch (error) {
    throw toAuthError(error, 'Falha no login.');
  }
}

export async function reauthenticateUser(currentPassword: string): Promise<string> {
  try {
    const response = await authApi.post<ReauthResponse>('/auth/reauth', { currentPassword });
    return response.data.reauthToken;
  } catch (error) {
    throw toAuthError(error, 'Falha na reautenticação.');
  }
}

export async function getCurrentUser(token?: string): Promise<User> {
  try {
    const response = await authApi.get<User>('/auth/me', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  } catch (error) {
    throw toAuthError(error, 'Falha ao carregar usuário autenticado.');
  }
}

export async function refreshAccessToken(): Promise<User> {
  try {
    const response = await authApi.post<AuthResponse>('/auth/refresh');
    return persistAuthSession(response.data);
  } catch (error) {
    removeAccessTokenFromStorage();
    notifySessionExpired();
    throw toAuthError(error, 'Sessão expirada.');
  }
}

export async function updateUserProfile(
  updates: {
    name?: string;
    password?: string;
    avatarUrl?: string;
    currentPassword: string;
  },
  reauthToken?: string,
): Promise<User> {
  try {
    const response = await authApi.patch<User>(
      '/auth/profile',
      {
        name: updates.name,
        newPassword: updates.password,
        currentPassword: updates.currentPassword,
        avatarUrl: updates.avatarUrl,
      },
      {
        headers: reauthToken ? { 'X-Reauth-Token': reauthToken } : undefined,
      },
    );
    return response.data;
  } catch (error) {
    throw toAuthError(error, 'Falha ao atualizar perfil.');
  }
}

export async function uploadUserAvatar(file: File, currentPassword: string): Promise<User> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('currentPassword', currentPassword);

    const response = await authApi.post<User>('/auth/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw toAuthError(error, 'Falha ao enviar avatar.');
  }
}

export async function logoutUser() {
  try {
    await authApi.post('/auth/logout');
  } catch {
    // Mesmo se o backend falhar, limpamos o cliente local.
  } finally {
    removeAccessTokenFromStorage();
  }
}

export async function deleteAccountUser(currentPassword: string, reauthToken?: string) {
  try {
    await authApi.post(
      '/auth/account/delete',
      { currentPassword },
      {
        headers: reauthToken ? { 'X-Reauth-Token': reauthToken } : undefined,
      },
    );
  } catch (error) {
    throw toAuthError(error, 'Falha ao excluir conta.');
  } finally {
    removeAccessTokenFromStorage();
  }
}

export function getStoredAccessToken() {
  return loadAccessTokenFromStorage();
}

export function clearStoredAccessToken() {
  removeAccessTokenFromStorage();
}
