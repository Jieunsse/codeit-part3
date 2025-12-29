import type { RatingRange } from '../types/rating.types';

export const RATING_ITEMS: readonly {
  key: RatingRange;
  label: string;
}[] = [
  { key: 'all', label: '전체' },
  { key: '4.8-5.0', label: '4.8 - 5.0' },
  { key: '4.5-4.8', label: '4.5 - 4.8' },
  { key: '4.0-4.5', label: '4.0 - 4.5' },
  { key: '3.0-4.0', label: '3.0 - 4.0' },
] as const;
