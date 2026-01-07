import { useEffect } from 'react';
import { axiosInstance } from '@src/shared/apis/basic/axios';
import { useAuthStore } from '@src/domain/auth/store/authStore';
import type { UserMeResponse } from '@src/domain/user/Interface/UserMeResponse';
import { mapUserMeResponseToUser } from '@src/domain/user/mapper/mapper';

export function AuthInitializer() {
  const login = useAuthStore((state) => state.login);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      logout();
      return;
    }

    setAccessToken(token);

    async function init() {
      try {
        const res = await axiosInstance.get<UserMeResponse>('/users/me');
        login(mapUserMeResponseToUser(res.data));
      } catch {
        logout();
      }
    }

    init();
  }, [login, logout, setAccessToken]);

  return null;
}
