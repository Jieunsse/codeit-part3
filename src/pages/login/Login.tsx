import { useState } from 'react';
import Logo from './img/Logo.svg';
import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import { useLoginForm } from './hooks/useLoginForm';
import { ensureKakaoReady } from './components/KakaoLoader';
import { postSocialSignIn } from './api/socialLogin.api';
import type { SocialProvider, SocialSignInRequest } from './api/socialLogin.api';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../../firebase';

export function Login() {
  const { form, errors, onChange, submit, setErrors } = useLoginForm();
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res) window.location.href = '/';
  };

  const onGoogleLogin = async () => {
    if (socialLoading) return;
    try {
      setSocialLoading('GOOGLE');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      if (!result.user) throw new Error('Firebase 사용자 정보를 가져올 수 없습니다.');

      const idToken = await result.user.getIdToken();
      const signInData: SocialSignInRequest = {
        token: idToken,
        redirectUri: window.location.origin + '/oauth/google',
        state: 'google_login_verified',
      };

      const res = await postSocialSignIn('GOOGLE', signInData);
      if (!res?.accessToken || !res.refreshToken || !res.user)
        throw new Error('서버에서 필요한 로그인 정보를 반환하지 않았습니다.');

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.href = '/';
    } catch (err: unknown) {
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      if (err instanceof Error) errorMessage = err.message;
      setErrors?.({ email: errorMessage });
    } finally {
      setSocialLoading(null);
    }
  };

  const onKakaoLogin = async () => {
    if (socialLoading) return;
    try {
      setSocialLoading('KAKAO');
      const kakao = await ensureKakaoReady();
      kakao.Auth.authorize({
        redirectUri: window.location.origin + '/oauth/kakao',
        state: 'kakao_login_verified',
      });
    } catch {
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-[343px] rounded-2xl border border-gray-300 bg-white px-5 py-14 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:max-w-[496px] md:px-12 md:py-16">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" />
        </div>

        <LoginForm
          form={form}
          errors={errors}
          onChange={onChange}
          onSubmit={onSubmit}
          setErrors={setErrors}
        />
        <SocialLoginButtons
          onGoogleLogin={onGoogleLogin}
          onKakaoLogin={onKakaoLogin}
          socialLoading={socialLoading}
        />

        <div className="mt-6 flex items-center justify-center gap-3 text-[14px] md:mt-8 md:text-[16px]">
          <span className="font-regular text-gray-500">계정이 없으신가요?</span>
          <a href="/Signup" className="cursor-pointer font-medium text-violet-800 hover:underline">
            회원가입하기
          </a>
        </div>
      </div>
    </div>
  );
}
