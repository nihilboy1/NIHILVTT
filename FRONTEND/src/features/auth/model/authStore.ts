import { create } from 'zustand';

import {
  loadUserFromLocalStorage,
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
} from './authLocalStorage';
import { User } from './authSchemas';
import {
  registerUser as apiRegisterUser,
  loginUser as apiLoginUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from './authSlice';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  initializeAuth: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  login: (credentials: Pick<User, 'email'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: {
    name?: string;
    password?: string;
    currentPassword?: string;
  }) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  initializeAuth: () => {
    set({ isLoading: true });
    const storedUser = loadUserFromLocalStorage();
    if (storedUser) {
      set({ user: storedUser });
    }
    set({ isLoading: false });
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await apiRegisterUser(userData);
      set({ user: newUser });
      saveUserToLocalStorage(newUser);
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Registration failed.',
        user: null,
      });
      removeUserFromLocalStorage();
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const loggedInUser = await apiLoginUser(credentials);
      set({ user: loggedInUser });
      saveUserToLocalStorage(loggedInUser);
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Login failed.',
        user: null,
      });
      removeUserFromLocalStorage();
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null });
    removeUserFromLocalStorage();
  },

  updateProfile: async (updates) => {
    set({ error: null });
    try {
      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('No user logged in.');
      }
      const updatedUser = await apiUpdateUser(currentUser.id, updates);
      set({ user: updatedUser });
      saveUserToLocalStorage(updatedUser);
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to update profile.',
      });
      throw err;
    }
  },

  deleteAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('No user logged in.');
      }
      await apiDeleteUser(currentUser.id);
      set({ user: null });
      removeUserFromLocalStorage();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to delete account.',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
