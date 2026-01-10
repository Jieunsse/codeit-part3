// login/api/socialLogin.api.ts
import { axiosInstance } from '@src/shared/apis/basic/axios';

export type SocialProvider = 'GOOGLE' | 'KAKAO';

export type SocialSignInRequest = {
  token: string; // Google / Kakao id_token
  redirectUri?: string;
  state?: string;
};

export type SocialSignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    state?: string;
  };
};

export async function postSocialSignIn(provider: SocialProvider, body: SocialSignInRequest) {
  const { data } = await axiosInstance.post<SocialSignInResponse>(`/auth/signIn/${provider}`, body);
  return data;
}
