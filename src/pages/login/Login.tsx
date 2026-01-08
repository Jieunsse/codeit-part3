import { useState } from 'react';
import axios from 'axios';
import Button from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import Logo from './img/Logo.svg';
import GoogleIcon from './img/GoogleIcon.svg';
import KakaoIcon from './img/KakaoIcon.svg';
import { useLoginForm } from './useLoginForm';
import { postSocialSignIn } from './api/socialLogin.api';
import type { SocialProvider, SocialSignInRequest } from './api/socialLogin.api';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../../firebase';

interface IKakaoAuth {
  authorize: (options: { redirectUri: string; state?: string }) => void;
}

interface IKakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: IKakaoAuth;
}

declare global {
  interface Window {
    Kakao?: IKakao;
  }
}

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

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
      if (!res || !res.accessToken || !res.refreshToken || !res.user) {
        throw new Error('서버에서 필요한 로그인 정보를 반환하지 않았습니다.');
      }
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.href = '/';
    } catch (err: unknown) {
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      if (axios.isAxiosError(err)) {
        const serverData = err.response?.data as { message?: string };
        if (serverData?.message) errorMessage = serverData.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setErrors({ email: errorMessage });
    } finally {
      setSocialLoading(null);
    }
  };

  const ensureKakaoReady = async (): Promise<IKakao> => {
    if (!KAKAO_JS_KEY) throw new Error('KAKAO_JS_KEY missing');
    await loadScript('https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js', 'kakao-sdk');
    const kakao = window.Kakao;
    if (!kakao) throw new Error('Kakao SDK missing');
    if (!kakao.isInitialized()) kakao.init(KAKAO_JS_KEY);
    return kakao;
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

        <form onSubmit={onSubmit} className="mt-14 flex flex-col gap-4 md:mt-16 md:gap-[25px]">
          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] font-medium text-gray-800 md:text-[16px]">이메일</label>
            <Input
              title=" "
              value={form.email}
              onChange={onChange('email')}
              placeholder="이메일 입력"
              type="email"
            />
            {errors.email && (
              <p className="text-[12px] font-semibold text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] font-medium text-gray-800 md:text-[16px]">비밀번호</label>
            <Input
              title=" "
              value={form.password}
              onChange={onChange('password')}
              placeholder="비밀번호 입력"
              type="password"
            />
            {errors.password && (
              <p className="text-[12px] font-semibold text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="-mt-2.5">
            <a
              href="/forgotPassword"
              className="cursor-pointer font-medium text-violet-800 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>

          <div className="flex flex-col gap-[15px] pt-[26px]">
            <Button
              type="submit"
              className="h-[50px] w-full cursor-pointer rounded-2xl bg-violet-700 font-bold text-white transition-colors hover:bg-violet-800"
            >
              로그인
            </Button>

            <Button
              type="button"
              onClick={onGoogleLogin}
              disabled={socialLoading !== null}
              className="h-[50px] w-full cursor-pointer rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="inline-flex items-center justify-center gap-3 text-[14px] font-medium text-gray-800">
                <img src={GoogleIcon} alt="Google" />
                {socialLoading === 'GOOGLE' ? '통신 중...' : 'Google로 시작하기'}
              </span>
            </Button>

            <Button
              type="button"
              onClick={onKakaoLogin}
              disabled={socialLoading !== null}
              className="h-[50px] w-full cursor-pointer rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="inline-flex items-center justify-center gap-3 text-[14px] font-medium text-gray-800">
                <img src={KakaoIcon} alt="Kakao" />
                {socialLoading === 'KAKAO' ? '통신 중...' : 'Kakao로 시작하기'}
              </span>
            </Button>
          </div>
        </form>

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
