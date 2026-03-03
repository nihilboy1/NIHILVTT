import { create } from 'zustand';

import { AuthErrorState, buildAuthError, normalizeAuthError } from './authErrors';
import { User } from './authSchemas';
import {
  registerUser as apiRegisterUser,
  loginUser as apiLoginUser,
  getCurrentUser as apiGetCurrentUser,
  refreshAccessToken as apiRefreshAccessToken,
  updateUserProfile as apiUpdateUserProfile,
  uploadUserAvatar as apiUploadUserAvatar,
  reauthenticateUser as apiReauthenticateUser,
  logoutUser as apiLogoutUser,
  deleteAccountUser as apiDeleteAccountUser,
  getStoredAccessToken,
  clearStoredAccessToken,
} from './authSlice';

let initializeAuthInFlight: Promise<void> | null = null;

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  authError: AuthErrorState | null;
  initializeAuth: () => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: {
    name?: string;
    password?: string;
    avatarUrl?: string;
    avatarFile?: File;
    currentPassword?: string;
  }) => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
  clearAuthError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,
  authError: null,

  initializeAuth: async () => {
    if (initializeAuthInFlight) {
      return initializeAuthInFlight;
    }

    initializeAuthInFlight = (async () => {
      set({ isLoading: true, authError: null, error: null });
      try {
        const accessToken = getStoredAccessToken();

        if (accessToken) {
          const user = await apiGetCurrentUser(accessToken);
          set({ user, error: null, authError: null });
          return;
        }

        // Se não houver token de acesso, tenta recuperar sessão pelo refresh cookie.
        const refreshedUser = await apiRefreshAccessToken();
        set({ user: refreshedUser, error: null, authError: null });
      } catch {
        set({ user: null });
        clearStoredAccessToken();
      } finally {
        set({ isLoading: false });
        initializeAuthInFlight = null;
      }
    })();

    return initializeAuthInFlight;
  },

  register: async (userData) => {
    set({ isLoading: true, error: null, authError: null });
    try {
      const newUser = await apiRegisterUser(userData);
      set({ user: newUser });
    } catch (err) {
      const parsedError = normalizeAuthError(err, 'Falha no registro.');
      set({ error: parsedError.formError, authError: parsedError, user: null });
      clearStoredAccessToken();
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null, authError: null });
    try {
      const loggedInUser = await apiLoginUser(credentials);
      set({ user: loggedInUser });
    } catch (err) {
      const parsedError = normalizeAuthError(err, 'Falha no login.');
      set({ error: parsedError.formError, authError: parsedError, user: null });
      clearStoredAccessToken();
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await apiLogoutUser();
    set({ user: null, error: null, authError: null });
    clearStoredAccessToken();
  },

  updateProfile: async (updates) => {
    set({ error: null, authError: null });
    const currentUser = get().user;
    if (!currentUser) {
      const authError = buildAuthError({
        code: 'UNAUTHORIZED',
        formError: 'Nenhum usuário autenticado.',
        fieldErrors: {},
      });
      const parsedError = normalizeAuthError(authError, authError.message);
      set({ error: parsedError.formError, authError: parsedError });
      throw authError;
    }

    try {
      const needsReauth = Boolean(updates.password && updates.password.trim().length > 0);
      const reauthToken = needsReauth
        ? await apiReauthenticateUser(updates.currentPassword ?? '')
        : undefined;

      const updatedUser = updates.avatarFile
        ? await apiUploadUserAvatar(updates.avatarFile, updates.currentPassword ?? '')
        : await apiUpdateUserProfile(
            {
              name: updates.name,
              password: updates.password,
              avatarUrl: updates.avatarUrl,
              currentPassword: updates.currentPassword ?? '',
            },
            reauthToken,
          );
      set({ user: updatedUser, error: null, authError: null });
    } catch (err) {
      const parsedError = normalizeAuthError(err, 'Falha ao atualizar perfil.');
      set({ error: parsedError.formError, authError: parsedError });
      throw err;
    }
  },

  deleteAccount: async (currentPassword: string) => {
    set({ isLoading: true, error: null, authError: null });
    const currentUser = get().user;
    if (!currentUser) {
      const authError = buildAuthError({
        code: 'UNAUTHORIZED',
        formError: 'Nenhum usuário autenticado.',
        fieldErrors: {},
      });
      const parsedError = normalizeAuthError(authError, authError.message);
      set({ isLoading: false, error: parsedError.formError, authError: parsedError });
      return;
    }

    try {
      const reauthToken = await apiReauthenticateUser(currentPassword);
      await apiDeleteAccountUser(currentPassword, reauthToken);
      set({ user: null, error: null, authError: null });
      clearStoredAccessToken();
    } catch (err) {
      const parsedError = normalizeAuthError(err, 'Falha ao excluir conta.');
      set({ error: parsedError.formError, authError: parsedError });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  clearAuthError: () => {
    set({ error: null, authError: null });
  },
}));
