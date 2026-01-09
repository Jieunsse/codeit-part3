import { axiosInstance } from '@src/shared/apis/basic/axios';
import { AUTH } from '../constants/login.constants';
import type { LoginRequest, LoginResponse } from '../types/login.types';

export async function postSignIn(body: LoginRequest) {
  const { data } = await axiosInstance.post<LoginResponse>(AUTH.SIGN_IN, body);
  return data;
}
