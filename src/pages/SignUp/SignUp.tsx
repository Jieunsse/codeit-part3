import type React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from './img/logo.svg';
import { postSignUp } from './api/signUp.api';

import { Input } from '../../components/input/Input';
import Button from '../../components/button/Button';

import { useSignUpForm } from './useSignUpForm';
import type { FormValues } from './useSignUpForm';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type ApiErrorResponse = {
  message?: string;
  details?: {
    email?: { message?: string };
    nickname?: { message?: string };
    password?: { message?: string };
    passwordConfirmation?: { message?: string };
  };
};

export function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  const { values, errors, touched, submitting, isFormValid, setFieldValue, handleBlur, submit } =
    useSignUpForm();

  const handleEmailChange = (e: InputChangeEvent) => {
    setFieldValue('email', e.target.value);
  };

  const handleNicknameChange = (e: InputChangeEvent) => {
    setFieldValue('nickname', e.target.value);
  };

  const handlePasswordChange = (e: InputChangeEvent) => {
    setFieldValue('password', e.target.value);
  };

  const handlePasswordConfirmChange = (e: InputChangeEvent) => {
    setFieldValue('passwordConfirm', e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submit(async (formValues: FormValues) => {
      try {
        const res = await postSignUp({
          email: formValues.email,
          nickname: formValues.nickname,
          password: formValues.password,
          passwordConfirmation: formValues.passwordConfirm,
        });

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        navigate('/');

        console.log('회원가입 성공', res);
      } catch (err: unknown) {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
          const data = err.response?.data;

          const message =
            data?.message ||
            data?.details?.email?.message ||
            data?.details?.nickname?.message ||
            data?.details?.password?.message ||
            data?.details?.passwordConfirmation?.message ||
            '회원가입에 실패했어요.';

          alert(message);
          return;
        }

        alert('알 수 없는 오류가 발생했어요.');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[343px] rounded-2xl border border-gray-300 bg-white px-5 py-14 shadow-lg md:max-w-[496px] md:px-12 md:py-20">
        {/* 로고 */}
        <div className="mb-16 flex justify-center">
          <button type="button">
            <img src={Logo} alt="WINE" className="h-[30px] w-[104px]" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field label="이메일" error={touched.email ? errors.email : undefined}>
            <Input
              title=" "
              value={values.email}
              placeholder="whyne@email.com"
              onChange={handleEmailChange}
              onBlur={() => handleBlur('email')}
            />
          </Field>

          <Field label="닉네임" error={touched.nickname ? errors.nickname : undefined}>
            <Input
              title=" "
              value={values.nickname}
              placeholder="whyne"
              onChange={handleNicknameChange}
              onBlur={() => handleBlur('nickname')}
            />
          </Field>

          <Field label="비밀번호" error={touched.password ? errors.password : undefined}>
            <Input
              title=" "
              type="password"
              value={values.password}
              placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
            />
          </Field>

          <Field
            label="비밀번호 확인"
            error={touched.passwordConfirm ? errors.passwordConfirm : undefined}
          >
            <Input
              title=" "
              type="password"
              value={values.passwordConfirm}
              placeholder="비밀번호 확인"
              onChange={handlePasswordConfirmChange}
              onBlur={() => handleBlur('passwordConfirm')}
            />
          </Field>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={!isFormValid || submitting}
              className="w-full cursor-pointer hover:bg-violet-800"
            >
              {submitting ? '가입 중...' : '가입하기'}
            </Button>
          </div>
        </form>

        {/* 하단 링크 */}
        <div className="font-regular mt-10 text-center text-[14px] text-gray-500 md:text-[16px]">
          계정이 이미 있으신가요?{' '}
          <Link to="/login">
            <button
              type="button"
              className="cursor-pointer text-[14px] font-medium text-violet-600 hover:underline md:text-[16px]"
            >
              로그인하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const show = Boolean(error);

  return (
    <div className="space-y-2.5">
      <label className="block text-[14px] leading-6 font-medium text-gray-800 md:text-[16px]">
        {label}
      </label>

      {children}

      <div
        className={[
          'overflow-hidden transition-all duration-1000 ease-out',
          show ? 'max-h-20' : 'max-h-0',
        ].join(' ')}
      >
        <p
          className={[
            'transform text-sm text-red-500 transition-all duration-1000 ease-out',
            show ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
          ].join(' ')}
          aria-live="polite"
        >
          {error ?? ''}
        </p>
      </div>
    </div>
  );
}
