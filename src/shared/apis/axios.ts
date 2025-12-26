import axios from 'axios';
import { API_BASE_URL } from './config';
import { TEAM_ID } from './team';

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${TEAM_ID}`,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
