import { useEffect } from 'react';

import { useAuthStore } from '@src/domain/user/stores/authStore';
import type { UserMeResponse } from '@src/domain/user/Interface/UserMeResponse';
import { mapUserMeResponseToUser } from '@src/domain/user/mapper/mapper';
import { axiosInstance } from '@src/shared/apis/basic/axios';

export function AuthInitializer() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const response = await axiosInstance.get<UserMeResponse>('/users/me');

        if (!mounted) return;

        const user = mapUserMeResponseToUser(response.data);
        login(user);
      } catch (error) {
        console.error(error);
        if (!mounted) return;
        logout();
      }
    }

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [login, logout]);

  return null;
}
