import type { CardReviewModel } from '../types/CardReviewModel';
import type { ReviewResponse } from '../types/ReviewResponse';
import { serverToUiTaste } from '../utils/tasteScale';

export function mapReviewToCardModel(review: ReviewResponse): CardReviewModel {
  return {
    reviewId: review.id,
    isLiked: Boolean(review.isLiked),
    username: review.user.nickname,
    createdAt: review.createdAt,
    text: review.content,
    chips: review.aroma.map((a) => ({ title: a })),
    mainChip: {
      label: '★',
      value: review.rating,
    },
    flavorValue: {
      body: serverToUiTaste(review.lightBold),
      tannin: serverToUiTaste(review.smoothTannic),
      sweet: serverToUiTaste(review.drySweet),
      acid: serverToUiTaste(review.softAcidic),
    },
  };
}
