import { useEffect, useRef, useState } from 'react';

import Button from '../../components/button/Button';
import { Input } from '../../components/input/Input';

import Logo from './img/Logo.svg';
import GoogleIcon from './img/GoogleIcon.svg';
import KakaoIcon from './img/KakaoIcon.svg';

import { useLoginForm } from './useLoginForm';
import { postSocialSignIn } from './api/socialLogin.api';
import type { SocialProvider } from './api/socialLogin.api';

// 환경 변수
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

// --- 스크립트 1회 로드 ---
function loadScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
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
    script.onerror = () => reject(new Error(`Failed to load ${src}`));

    document.head.appendChild(script);
  });
}

// ---- Login 컴포넌트 ----
export function Login() {
  const { form, errors, onChange, submit, setErrors } = useLoginForm();
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  // Google SDK 준비 여부
  const googleReadyRef = useRef(false);

  // ---- 공통 소셜 로그인 처리 ----
  const handleSocialLogin = async (provider: SocialProvider, token: string) => {
    try {
      const res = await postSocialSignIn(provider, {
        token,
        redirectUri: 'http://localhost:3000/oauth/kakao',
        state: 'some-state',
      });

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));

      window.location.href = '/';
    } catch (err) {
      console.error(`${provider} social login API 오류:`, err);
      setErrors({ email: `${provider} 소셜 로그인에 실패했어요.` });
    } finally {
      setSocialLoading(null);
    }
  };

  // ---- Google SDK 로드 + 초기화 ----
  useEffect(() => {
    const initGoogle = async () => {
      if (!GOOGLE_CLIENT_ID) {
        console.error('GOOGLE_CLIENT_ID가 없습니다. .env 확인 필요');
        return;
      }

      try {
        await loadScript('https://accounts.google.com/gsi/client', 'google-gsi');

        if (!window.google?.accounts?.id) {
          console.error('Google SDK가 로드되지 않았습니다.');
          return;
        }

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: { credential?: string }) => {
            const idToken = response?.credential;
            if (!idToken) {
              setErrors({ email: '구글 로그인 토큰을 받지 못했어요.' });
              setSocialLoading(null);
              return;
            }

            await handleSocialLogin('GOOGLE', idToken);
          },
        });

        googleReadyRef.current = true;
        console.log('Google SDK 초기화 완료 ✅');
      } catch (err) {
        console.error('Google SDK 로드 실패:', err);
        googleReadyRef.current = false;
      }
    };

    initGoogle();
  }, [setErrors]);

  // ---- Kakao SDK 로드 + 초기화 ----
  const ensureKakaoReady = async () => {
    if (!KAKAO_JS_KEY) throw new Error('KAKAO_JS_KEY가 없습니다. .env 확인 필요');

    await loadScript('https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js', 'kakao-sdk');

    if (!window.Kakao) throw new Error('Kakao SDK를 찾을 수 없습니다.');

    // TS/ESLint 충돌 없이 타입 단언
    const kakao = window.Kakao as unknown as {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string; state?: string }) => void;
      };
    };

    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK 초기화 완료 ✅');
    } else {
      console.log('Kakao SDK 이미 초기화됨 ✅');
    }

    return kakao;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res) window.location.href = '/';
  };

  // ---- Google 로그인 버튼 ----
  const onGoogleLogin = async () => {
    if (socialLoading) return;

    if (!googleReadyRef.current || !window.google?.accounts?.id) {
      setErrors({ email: '구글 로그인 준비가 아직 안 되었어요. 키/설정을 확인해 주세요.' });
      return;
    }

    try {
      setSocialLoading('GOOGLE');
      window.google.accounts.id.prompt();
    } catch (err) {
      console.error('Google prompt() 오류:', err);
      setErrors({ email: '구글 로그인 실행 중 오류가 발생했어요.' });
      setSocialLoading(null);
    }
  };

  // ---- Kakao 로그인 버튼 ----
  const onKakaoLogin = async () => {
    if (socialLoading) return;

    try {
      setSocialLoading('KAKAO');
      const kakao = await ensureKakaoReady();

      // 2.7.2 SDK에서 authorize(redirect) 방식 사용
      kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth/kakao',
        state: 'some-state',
      });
    } catch (err) {
      console.error('Kakao SDK 준비/초기화 오류:', err);
      setErrors({ email: '카카오 로그인 준비 중 오류가 발생했어요. 키/설정을 확인해 주세요.' });
      setSocialLoading(null);
    }
  };

  // ---- JSX ----
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-[343px] rounded-2xl border border-gray-300 bg-white px-5 py-14 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:max-w-[496px] md:px-12 md:py-16">
        <img src={Logo} alt="Wine Logo" className="mx-auto" />

        <form onSubmit={onSubmit} className="mt-14 flex flex-col gap-4 md:mt-16 md:gap-[25px]">
          {/* 이메일 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] leading-6 font-medium text-gray-800 md:text-[16px]">
              이메일
            </label>
            <Input
              title=" "
              value={form.email}
              onChange={onChange('email')}
              placeholder="이메일 입력"
              type="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
            <p
              className={`overflow-hidden text-[12px] leading-5 text-red-600 transition-[max-height,opacity] duration-1000 ease-out md:text-[14px] ${errors.email ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {errors.email}
            </p>
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] leading-6 font-medium text-gray-800 md:text-[16px]">
              비밀번호
            </label>
            <Input
              title=" "
              value={form.password}
              onChange={onChange('password')}
              placeholder="비밀번호 입력"
              type="password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            <p
              className={`overflow-hidden text-[12px] leading-5 text-red-600 transition-[max-height,opacity] duration-1000 ease-out md:text-[14px] ${errors.password ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {errors.password}
            </p>
          </div>

          <div className="-mt-5">
            <a
              href="/forgot-password"
              className="font-regular text-[12px] leading-6 text-purple-800 hover:underline md:text-[14px]"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>

          <div className="flex flex-col gap-[15px] pt-[26px]">
            <Button
              type="submit"
              className="h-[50px] w-full max-w-[400px] cursor-pointer rounded-2xl bg-violet-700 text-[14px] leading-6 font-bold text-white hover:bg-violet-800 md:text-[16px]"
            >
              로그인
            </Button>

            <Button
              type="button"
              onClick={onGoogleLogin}
              disabled={socialLoading !== null}
              className="h-[50px] w-full max-w-[400px] rounded-2xl border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="inline-flex items-center justify-center gap-3 text-[14px] leading-6 font-medium whitespace-nowrap text-gray-800 md:text-[16px]">
                <img src={GoogleIcon} alt="GoogleIcon" />
                {socialLoading === 'GOOGLE' ? 'Google 로그인 중...' : 'Google로 시작하기'}
              </span>
            </Button>

            <Button
              type="button"
              onClick={onKakaoLogin}
              disabled={socialLoading !== null}
              className="h-[50px] w-full max-w-[400px] rounded-2xl border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="inline-flex items-center justify-center gap-3 text-[14px] leading-6 font-medium whitespace-nowrap text-gray-800 md:text-[16px]">
                <img src={KakaoIcon} alt="KakaoIcon" />
                {socialLoading === 'KAKAO' ? 'Kakao 로그인 중...' : 'kakao로 시작하기'}
              </span>
            </Button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center gap-3 text-[14px] md:mt-8 md:text-[16px]">
          <span className="font-regular cursor-pointer text-gray-500 hover:underline">
            계정이 없으신가요?
          </span>
          <a href="/Signup" className="cursor-pointer font-medium text-violet-800 hover:underline">
            회원가입하기
          </a>
        </div>
      </div>
    </div>
  );
}
