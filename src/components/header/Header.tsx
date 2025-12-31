import { Link, useNavigate } from 'react-router-dom';
import wineLogo from '@shared/assets/wine-logo.svg';
import { ProfileImg } from '../profileImg/ProfileImg';

export function Header() {
  const isLoggedIn = false;
  const navigate = useNavigate();

  return (
    <header className="flex h-[50px] w-[343px] items-center justify-between gap-[10px] rounded-[12px] bg-black px-[20px] py-[15px] md:h-[70px] md:w-[704px] md:rounded-[16px] md:px-[60px] md:py-[11px] lg:w-[1140px]">
      <Link to="/" aria-label="홈으로 이동" className="h-[15px] w-[52px]">
        <img src={wineLogo} alt="서비스 로고" />
      </Link>

      {isLoggedIn ? (
        <ProfileImg src="" size={45} onClick={() => navigate('/mypage')} />
      ) : (
        <button className="cursor-pointer text-lg font-medium text-white">로그인</button>
      )}
    </header>
  );
}
