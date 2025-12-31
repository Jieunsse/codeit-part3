// SignUpForm/utils/validators.ts

export function isEmailFormat(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isAllowedPasswordCharset(value: string) {
  // 숫자, 영문, 특수문자(!@#$%^&*)만 허용
  return /^[A-Za-z0-9!@#$%^&*]+$/.test(value);
}
