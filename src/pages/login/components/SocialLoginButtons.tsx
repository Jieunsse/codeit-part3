import Button from '../../../components/button/Button';
import GoogleIcon from '../img/GoogleIcon.svg';
import KakaoIcon from '../img/KakaoIcon.svg';
import type { SocialProvider } from '../api/socialLogin.api';

interface Props {
  onGoogleLogin: () => void;
  onKakaoLogin: () => void;
  socialLoading: SocialProvider | null;
}

export default function SocialLoginButtons({ onGoogleLogin, onKakaoLogin, socialLoading }: Props) {
  return (
    <div className="flex flex-col gap-[15px] pt-[15px]">
      <Button
        type="button"
        onClick={onGoogleLogin}
        disabled={socialLoading !== null}
        className="relative flex h-[50px] w-full cursor-pointer items-center justify-center rounded-2xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50"
      >
        <img src={GoogleIcon} alt="Google" className="mr-3" />
        <span className="text-[14px] font-medium md:text-[16px]">Google로 시작하기</span>
      </Button>

      <Button
        type="button"
        onClick={onKakaoLogin}
        disabled={socialLoading !== null}
        className="relative flex h-[50px] w-full cursor-pointer items-center justify-center rounded-2xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50"
      >
        <img src={KakaoIcon} alt="Kakao" className="mr-3" />
        <span className="text-[14px] font-medium md:text-[16px]">Kakao로 시작하기</span>
      </Button>
    </div>
  );
}
