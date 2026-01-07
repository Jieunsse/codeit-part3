import type { Review } from './review';

// 내 리뷰 데이터
export interface MyReview extends Review {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}
