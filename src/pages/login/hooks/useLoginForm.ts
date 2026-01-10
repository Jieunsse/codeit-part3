// login/hooks/useLoginForm.ts
import { useState } from 'react';
import type { LoginErrors, LoginForm } from '../types/login.types';
import { EMAIL_REGEX, LOGIN_ERROR_MESSAGE } from '../constants/login.constants';
import { postSignIn } from '../api/login.api';
import { postSocialSignIn } from '../api/socialLogin.api';
import { useAuthStore } from '@src/domain/auth/store/authStore';
import { mapLoginUserToUser } from '@src/domain/auth/mapper/mapLoginUserToUser';
import type { SocialProvider, SocialSignInRequest } from '../api/socialLogin.api';

export function useLoginForm() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const login = useAuthStore((state) => state.login);

  const onChange = (key: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (value: LoginForm): LoginErrors => {
    const next: LoginErrors = {};
    if (!value.email.trim()) next.email = LOGIN_ERROR_MESSAGE.EMAIL_REQUIRED;
    else if (!EMAIL_REGEX.test(value.email)) next.email = LOGIN_ERROR_MESSAGE.EMAIL_INVALID;
    if (!value.password.trim()) next.password = LOGIN_ERROR_MESSAGE.PASSWORD_REQUIRED;
    return next;
  };

  const submit = async () => {
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    try {
      const res = await postSignIn(form);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      setAccessToken(res.accessToken);
      login(mapLoginUserToUser(res.user));
      return res;
    } catch {
      setErrors({ email: LOGIN_ERROR_MESSAGE.LOGIN_FAILED });
    }
  };

  // ✅ 소셜 로그인 (Google / Kakao 공통)
  const socialLogin = async (provider: SocialProvider, signInData?: SocialSignInRequest) => {
    if (!signInData) return;

    try {
      const res = await postSocialSignIn(provider, signInData);
      if (!res?.accessToken || !res.refreshToken || !res.user) throw new Error('소셜 로그인 실패');

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      setAccessToken(res.accessToken);
      login(mapLoginUserToUser(res.user));

      window.location.href = '/';
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setErrors({ email: err.message });
      else setErrors({ email: '소셜 로그인 실패' });
    }
  };

  return { form, errors, onChange, submit, setErrors, socialLogin };
}
