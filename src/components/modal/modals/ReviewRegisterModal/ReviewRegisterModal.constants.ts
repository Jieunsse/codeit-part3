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
];

export const AROMA_MAP: Record<string, string> = {
  체리: 'CHERRY',
  베리: 'BERRY',
  오크: 'OAK',
  바닐라: 'VANILLA',
  후추: 'PEPPER',
  제빵: 'BAKERY',
  풀: 'GRASS',
  사과: 'APPLE',
  복숭아: 'PEACH',
  시트러스: 'CITRUS',
  트로피컬: 'TROPICAL',
  미네랄: 'MINERAL',
  꽃: 'FLOWER',
  담뱃잎: 'TOBACCO',
  흙: 'EARTH',
  초콜릿: 'CHOCOLATE',
  스파이스: 'SPICE',
  커피: 'COFFEE',
  가죽: 'LEATHER',
};

export const MAX_TOTAL_AROMAS = 25; // 기본 + 커스텀 합쳐서 최대 25개
export const MAX_SELECT_AROMAS = 5; // 칩 선택 가능 개수(최대)
