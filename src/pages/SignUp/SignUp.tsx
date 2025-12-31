import type React from 'react';
import Logo from './img/logo.svg';

import { Input } from '../../components/input/Input';
import Button from '../../components/button/Button';

import { useSignUpForm } from './useSignUpForm';
import type { FormValues } from './useSignUpForm';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function SignUp() {
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
      // ✅ 여기서 API 연결
      console.log('회원가입 요청 값:', formValues);
      // await signUpAPI(formValues);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-[520px] rounded-2xl border border-slate-100 bg-white px-10 py-12 shadow-lg">
        {/* 로고 */}
        <div className="mb-8 flex justify-center">
          <button type="button">
            <img src={Logo} alt="WINE" className="h-[30px] w-[104px]" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <Button type="submit" disabled={!isFormValid || submitting} className="w-full">
              {submitting ? '가입 중...' : '가입하기'}
            </Button>
          </div>
        </form>

        {/* 하단 링크 */}
        <div className="mt-8 text-center text-sm text-slate-500">
          계정이 이미 있으신가요?{' '}
          <button type="button" className="font-semibold text-violet-600 hover:underline">
            로그인하기
          </button>
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
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
