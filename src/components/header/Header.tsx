import { Link, useNavigate } from 'react-router-dom';
import wineLogo from '@shared/assets/wine-logo.svg';
import { ProfileImg } from '../profileImg/ProfileImg';

export function Header() {
  const isLoggedIn = false;
  const navigate = useNavigate();

  return (
    <header className="top-[20px] left-[20px] flex h-[70px] w-[1140px] items-center justify-between gap-[10px] rounded-[16px] bg-black px-[60px] pt-[11px] pb-[11px]">
      <Link to="/" aria-label="홈으로 이동" className="h-[15px] w-[52px]">
        <img src={wineLogo} alt="서비스 로고" />
      </Link>

      {isLoggedIn ? (
        <ProfileImg src="" size={36} onClick={() => navigate('/mypage')} />
      ) : (
        <button className="cursor-pointer text-right font-sans text-lg font-medium text-white">
          로그인
        </button>
      )}
    </header>
  );
}
