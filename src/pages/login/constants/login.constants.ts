export const AUTH = {
  SIGN_IN: '/auth/signin',
} as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LOGIN_ERROR_MESSAGE = {
  EMAIL_REQUIRED: '이메일은 필수 입력입니다.',
  EMAIL_INVALID: '이메일 형식으로 작성해 주세요.',
  PASSWORD_REQUIRED: '비밀번호는 필수 입력입니다.',
  LOGIN_FAILED: '이메일 혹은 비밀번호를 확인해주세요.',
} as const;
