export type LoginForm = {
  email: string;
  password: string;
};

export type LoginErrors = Partial<Record<keyof LoginForm, string>>;
export type LoginRequest = LoginForm;

export type LoginUser = {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: LoginUser;
};

export type SocialProvider = 'GOOGLE' | 'KAKAO';

export type SocialLoginRequest = {
  token: string;
  state?: string;
  redirectUri?: string;
};

export type SocialLoginResponse = LoginResponse;

export interface FormState {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}
