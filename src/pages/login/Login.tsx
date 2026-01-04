import { useEffect, useRef, useState } from 'react';

import Button from '../../components/button/Button';
import { Input } from '../../components/input/Input';

import Logo from './img/Logo.svg';
import GoogleIcon from './img/GoogleIcon.svg';
import KakaoIcon from './img/KakaoIcon.svg';

import { useLoginForm } from './useLoginForm';
import { postSocialSignIn } from './api/socialLogin.api';
import type { SocialProvider } from './api/socialLogin.api';

// 여기만 팀에서 발급받은 키로 교체
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const KAKAO_JS_KEY = 'YOUR_KAKAO_JAVASCRIPT_KEY';

// --- 유틸: 스크립트 1회 로드 ---
function loadScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;

    // 이미 존재하면 "로드된 것으로 간주"하고 진행
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

export function Login() {
  const { form, errors, onChange, submit, setErrors } = useLoginForm();

  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  // Google GIS init 여부
  const googleReadyRef = useRef(false);

  const handleSocialLogin = async (provider: SocialProvider, token: string) => {
    const res = await postSocialSignIn(provider, { token });

    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('user', JSON.stringify(res.user));

    window.location.href = '/';
  };

  // ---- Google SDK 로드 + 초기화 ----
  useEffect(() => {
    const initGoogle = async () => {
      try {
        await loadScript('https://accounts.google.com/gsi/client', 'google-gsi');
        if (!window.google?.accounts?.id) return;

        // 버튼 클릭 시 prompt()로 credential을 받기 위해 초기화만 해둠
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: { credential?: string }) => {
            const idToken = response?.credential;
            if (!idToken) {
              setErrors({ email: '구글 로그인 토큰을 받지 못했어요.' });
              return;
            }

            try {
              setSocialLoading('GOOGLE');
              // 서버가 Google에 대해 token으로 "idToken(credential)"을 받는다고 가정
              await handleSocialLogin('GOOGLE', idToken);
            } catch {
              setErrors({ email: '구글 소셜 로그인에 실패했어요.' });
            } finally {
              setSocialLoading(null);
            }
          },
        });

        googleReadyRef.current = true;
      } catch {
        // SDK 로드 실패
        // (UI는 유지하고, 클릭 시 안내)
        googleReadyRef.current = false;
      }
    };

    // 키가 placeholder면 초기화 시도하지 않게 막고 싶으면 아래 주석 해제
    // if (GOOGLE_CLIENT_ID.startsWith('YOUR_')) return;

    initGoogle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Kakao SDK 로드 + 초기화 ----
  const ensureKakaoReady = async () => {
    await loadScript('https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js', 'kakao-sdk');

    if (!window.Kakao) throw new Error('Kakao SDK not found');

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res) window.location.href = '/';
  };

  const onGoogleLogin = async () => {
    try {
      if (!googleReadyRef.current || !window.google?.accounts?.id) {
        setErrors({ email: '구글 로그인 준비가 아직 안 되었어요. 키/설정을 확인해 주세요.' });
        return;
      }

      setSocialLoading('GOOGLE');
      window.google.accounts.id.prompt();
    } catch {
      setSocialLoading(null);
      setErrors({ email: '구글 로그인 실행 중 오류가 발생했어요.' });
    }
  };

  const onKakaoLogin = async () => {
    try {
      setSocialLoading('KAKAO');
      await ensureKakaoReady();

      const kakao = window.Kakao;
      if (!kakao) {
        setErrors({ email: '카카오 SDK를 불러오지 못했어요.' });
        setSocialLoading(null);
        return;
      }

      kakao.Auth.login({
        scope: 'profile_nickname,profile_image,account_email',
        success: async (authObj: { access_token?: string }) => {
          const fallback =
            typeof kakao.Auth.getAccessToken === 'function' ? kakao.Auth.getAccessToken() : null;

          const kakaoAccessToken = authObj?.access_token || fallback;

          if (!kakaoAccessToken) {
            setErrors({ email: '카카오 로그인 토큰을 받지 못했어요.' });
            setSocialLoading(null);
            return;
          }

          try {
            await handleSocialLogin('KAKAO', kakaoAccessToken);
          } catch {
            setErrors({ email: '카카오 소셜 로그인에 실패했어요.' });
            setSocialLoading(null);
          }
        },
        fail: () => {
          setErrors({ email: '카카오 로그인에 실패했어요.' });
          setSocialLoading(null);
        },
      });
    } catch {
      setErrors({ email: '카카오 로그인 준비 중 오류가 발생했어요. 키/설정을 확인해 주세요.' });
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-[343px] rounded-2xl border border-gray-300 bg-white px-5 py-14 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:max-w-[496px] md:px-12 md:py-16">
        <img src={Logo} alt="Wine Logo" className="mx-auto" />

        <form onSubmit={onSubmit} className="mt-14 flex flex-col gap-4 md:mt-16 md:gap-[25px]">
          {/* Email */}
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
              className={`overflow-hidden text-[12px] leading-5 text-red-600 transition-[max-height,opacity] duration-1000 ease-out md:text-[14px] ${
                errors.email ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
              } `}
            >
              {errors.email}
            </p>
          </div>

          {/* Password */}
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
              className={`overflow-hidden text-[12px] leading-5 text-red-600 transition-[max-height,opacity] duration-1000 ease-out md:text-[14px] ${
                errors.password ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
              } `}
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
