import { axiosInstance } from '../../../shared/apis/axios';

export type SignUpRequest = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
  };
};

export async function postSignUp(body: SignUpRequest) {
  const { data } = await axiosInstance.post<SignUpResponse>('/auth/signUp', body);

  return data;
}
