import { Link, useNavigate } from 'react-router-dom';
import wineLogo from '@shared/assets/wine-logo.svg';
import defaultProfileImg from '@shared/assets/images/default-profile.svg';
import { ProfileImg } from '../profileImg/ProfileImg';
import { useAuthStore } from '@src/domain/auth/store/authStore';

export function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const profileImageSrc = user?.profileImage || defaultProfileImg;

  return (
    <header className="mx-auto flex h-[50px] w-full max-w-[343px] items-center justify-between gap-[10px] rounded-[12px] bg-black px-[20px] py-[15px] md:mt-[24px] md:h-[70px] md:max-w-[704px] md:rounded-[16px] md:px-[60px] md:py-[11px] lg:max-w-[1140px]">
      <Link to="/" aria-label="홈으로 이동" className="h-[15px] w-[52px]">
        <img src={wineLogo} alt="서비스 로고" />
      </Link>

      {isAuthenticated && user ? (
        <ProfileImg src={profileImageSrc} size={45} onClick={() => alert('드롭다운 연결하기')} />
      ) : (
        <button
          className="cursor-pointer text-lg font-medium text-white"
          onClick={() => navigate('/login')}
        >
          로그인
        </button>
      )}
    </header>
  );
}
