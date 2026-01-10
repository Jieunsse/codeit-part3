import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@src/domain/user/Interface/User';

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // 로그인 시 유저 정보를 저장하고 인증 상태를 true로 변경
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      // 토큰 저장 및 인증 상태 업데이트
      setAccessToken: (token) => {
        // persist를 사용하므로 localStorage.setItem을 직접 호출하지 않아도
        // 'auth-storage'라는 이름으로 로컬스토리지에 자동 저장됩니다.
        set({
          accessToken: token,
          isAuthenticated: true,
        });
      },

      // 로그아웃 시 모든 상태 초기화
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
