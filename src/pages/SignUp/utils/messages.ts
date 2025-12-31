// SignUpForm/utils/messages.ts

export const SIGNUP_MSG = {
  emailRequired: '이메일은 필수 입력입니다.',
  emailInvalid: '이메일 형식으로 작성해 주세요.',
  nicknameRequired: '닉네임은 필수 입력입니다.',
  nicknameMax: '닉네임은 최대 20자까지 가능합니다.',
  pwRequired: '비밀번호는 필수 입력입니다.',
  pwMin: '비밀번호는 최소 8자 이상입니다.',
  pwCharset: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
  pwcRequired: '비밀번호 확인을 입력해주세요.',
  pwcMismatch: '비밀번호가 일치하지 않습니다.',
} as const;
