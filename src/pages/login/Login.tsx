import Button from '../../components/button/Button';
import { Input } from '../../components/input/Input';

import Logo from './img/Logo.svg';
import GoogleIcon from './img/GoogleIcon.svg';
import KakaoIcon from './img/KakaoIcon.svg';

import { useLoginForm } from './useLoginForm';

export function Login() {
  const { form, errors, onChange, submit } = useLoginForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res) window.location.href = '/';
  };

  const onGoogleLogin = () => {
    // TODO: 구글 소셜 로그인 연결
    console.log('google login');
  };

  const onKakaoLogin = () => {
    // TODO: 카카오 소셜 로그인 연결
    console.log('kakao login');
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
              className={`overflow-hidden text-[12px] leading-5 text-red-600 transition-[max-height,opacity] duration-1000 ease-out md:text-[14px] ${errors.email ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'} `}
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
              className={`overflow-hidden text-[12px] leading-5 text-red-600 transition-[max-height,opacity] duration-1000 ease-out md:text-[14px] ${errors.password ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'} `}
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
              className="h-[50px] w-full max-w-[400px] rounded-2xl border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-100"
            >
              <span className="inline-flex items-center justify-center gap-3 text-[14px] leading-6 font-medium whitespace-nowrap text-gray-800 md:text-[16px]">
                <img src={GoogleIcon} alt="GoogleIcon" />
                Google로 시작하기
              </span>
            </Button>

            <Button
              type="button"
              onClick={onKakaoLogin}
              className="h-[50px] w-full max-w-[400px] rounded-2xl border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-100"
            >
              <span className="inline-flex items-center justify-center gap-3 text-[14px] leading-6 font-medium whitespace-nowrap text-gray-800 md:text-[16px]">
                <img src={KakaoIcon} alt="KakaoIcon" />
                kakao로 시작하기
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
