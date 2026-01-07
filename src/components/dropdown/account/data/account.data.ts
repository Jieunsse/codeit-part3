import type { DropdownItem } from '../../base/types/Dropdown.type';
import type { AccountAction } from '../types/account.type';

export const ACCOUNT_ITEMS: readonly DropdownItem<AccountAction>[] = [
  { key: 'mypage', label: '마이페이지' },
  { key: 'logout', label: '로그아웃' },
] as const;
