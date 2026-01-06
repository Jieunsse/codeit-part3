import axios from 'axios';
import { API_BASE_URL } from './config';
import { TEAM_ID } from './team';
import { DEV_ACCESS_TOKEN } from '../devToken';

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${TEAM_ID}`,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${DEV_ACCESS_TOKEN}`,
  },
});
