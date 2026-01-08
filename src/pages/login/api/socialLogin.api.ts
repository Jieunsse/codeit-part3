import { axiosInstance } from '@src/shared/apis/basic/axios';

export type SocialProvider = 'GOOGLE' | 'KAKAO';

export type SocialSignInRequest = {
  token: string; // provider에서 받은 토큰
  redirectUri?: string; // swagger에 있으면 같이 보냄
  state?: string; // 있으면 같이 보냄
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
  };
};

export async function postSocialSignIn(provider: SocialProvider, body: SocialSignInRequest) {
  // 만약 서버가 /auth/signin/KAKAO 주소를 기다린다면:
  const { data } = await axiosInstance.post<SocialSignInResponse>(`/auth/signin/${provider}`, body);
  return data;
}
