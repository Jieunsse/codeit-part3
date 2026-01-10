// login/Login.tsx
import { useState } from 'react';
import Logo from './img/Logo.svg';
import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import { useLoginForm } from './hooks/useLoginForm';
import { ensureKakaoReady } from './components/KakaoLoader';
import type { SocialProvider } from './api/socialLogin.api';

export function Login() {
  const { form, errors, onChange, submit, setErrors } = useLoginForm();
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res) window.location.href = '/';
  };

  // ✅ Google OAuth
  const onGoogleLogin = () => {
    if (socialLoading) return;
    setSocialLoading('GOOGLE');

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: window.location.origin + '/oauth/google',
      response_type: 'code',
      scope: 'openid email profile',
      state: 'google_login_verified',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  // ✅ Kakao OAuth
  const onKakaoLogin = async () => {
    if (socialLoading) return;
    try {
      setSocialLoading('KAKAO');
      const kakao = await ensureKakaoReady();
      kakao.Auth.authorize({
        redirectUri: window.location.origin + '/oauth/kakao',
        state: 'kakao_login_verified',
      });
    } finally {
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
      </div>
    </div>
  );
}
