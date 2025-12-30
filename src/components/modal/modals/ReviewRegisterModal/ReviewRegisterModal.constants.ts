import type { ReviewTasteKey } from './ReviewRegisterModal.types';

export const DEFAULT_TASTE: Record<ReviewTasteKey, number> = {
  body: 50,
  tannin: 35,
  sweet: 40,
  acid: 55,
};

export const DEFAULT_AROMAS = [
  '체리',
  '베리',
  '오크',
  '바닐라',
  '후추',
  '제빵',
  '풀',
  '사과',
  '복숭아',
  '시트러스',
  '트로피컬',
  '미네랄',
  '꽃',
  '담뱃잎',
  '흙',
  '초콜릿',
  '스파이스',
  '커피',
  '가죽',
] as const;

export const MAX_TOTAL_AROMAS = 25; // 기본 + 커스텀 합쳐서 최대 25개
export const MAX_SELECT_AROMAS = 5; // 칩 선택 가능 개수(최대)
