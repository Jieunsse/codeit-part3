import axios from 'axios';
import { API_BASE_URL } from './config';
import { TEAM_ID } from './team';
import { useAuthStore } from '@src/domain/auth/store/authStore';

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${TEAM_ID}`,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);
