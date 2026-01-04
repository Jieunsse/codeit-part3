import { axiosInstance } from '../../../shared/apis/axios';
import { AUTH } from '../login.constants';
import type { LoginRequest, LoginResponse } from '../login.types';

export async function postSignIn(body: LoginRequest) {
  const { data } = await axiosInstance.post<LoginResponse>(AUTH.SIGN_IN, body);
  return data;
}
