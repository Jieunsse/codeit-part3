import { useState } from 'react';
import type { LoginErrors, LoginForm } from './login.types';
import { EMAIL_REGEX, LOGIN_ERROR_MESSAGE } from './login.constants';
import { postSignIn } from './api/login.api';

export function useLoginForm() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const onChange = (key: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [key]: value }));

    // 입력 시 해당 필드 에러 제거
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (value: LoginForm): LoginErrors => {
    const next: LoginErrors = {};

    if (!value.email.trim()) {
      next.email = LOGIN_ERROR_MESSAGE.EMAIL_REQUIRED;
    } else if (!EMAIL_REGEX.test(value.email)) {
      next.email = LOGIN_ERROR_MESSAGE.EMAIL_INVALID;
    }

    if (!value.password.trim()) {
      next.password = LOGIN_ERROR_MESSAGE.PASSWORD_REQUIRED;
    }

    return next;
  };

  /**
   * 실제 API 붙이기
   * - 성공: 그대로 return
   * - 실패: catch에서 이메일 입력창에 에러 세팅
   */
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
      localStorage.setItem('user', JSON.stringify(res.user));

      return res;
    } catch {
      setErrors({ email: LOGIN_ERROR_MESSAGE.LOGIN_FAILED });
      return;
    }
  };

  return {
    form,
    errors,
    onChange,
    submit,
    setErrors,
  };
}
