import { useNavigate } from 'react-router-dom';
import { DropdownBase } from './base/DropdownBase';
import { ACCOUNT_ITEMS } from './account/data/account.data';
import { useAuthStore } from '@src/domain/auth/store/authStore';

/**
 * 사용자 계정 관련 액션을 제공하는 드롭다운 컴포넌트
 *
 * - "마이페이지", "로그아웃" 항목을 포함합니다.
 * - 각 항목 클릭 시 필요한 라우팅 로직을 컴포넌트 내부에서 처리합니다.
 * - 외부에서는 라우팅이나 아이템 구성을 알 필요 없이 바로 사용할 수 있습니다.
 *
 * ### UI 특징
 * - 항목에 마우스를 올렸을 때만 강조 스타일이 적용됩니다.
 * - 선택 상태는 시각적으로 유지되지 않습니다.
 *
 * @example
 * ```tsx
 * <AccountDropdown />
 * ```
 */
export function AccountDropdown() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleItemClick = (item: { key: string }) => {
    if (item.key === 'mypage') {
      navigate('/myprofile');
      return;
    }

    if (item.key === 'logout') {
      logout();
      navigate('/');
    }
  };

  return <DropdownBase items={ACCOUNT_ITEMS} width={126} onItemClick={handleItemClick} />;
}
