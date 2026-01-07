import { create } from 'zustand';
import type { User } from '@src/domain/user/Interface/User';

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: (user) =>
    set((state) => ({
      ...state,
      user,
      isAuthenticated: true,
    })),

  setAccessToken: (token) =>
    set((state) => ({
      ...state,
      accessToken: token,
    })),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
