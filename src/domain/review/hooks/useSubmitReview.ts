import type { ReviewSubmitValue } from '../interfaces/ReviewSubmitValue';

import { uiToServerTaste } from '../utils/tasteScale';
import { AROMA_MAP } from '../utils/aroma';
import { postReview } from '../apis/postReview';
import { saveReviewId } from '../utils/reviewStorage';

export function useSubmitReview(wineId: number) {
  return async (value: ReviewSubmitValue) => {
    if (value.rating < 1) {
      throw new Error('RATING_REQUIRED');
    }

    if (!value.content.trim()) {
      throw new Error('CONTENT_REQUIRED');
    }

    const aroma = value.aromas.map((a) => AROMA_MAP[a]).filter((v): v is string => Boolean(v));

    if (aroma.length === 0) {
      throw new Error('AROMA_REQUIRED');
    }

    const review = await postReview({
      rating: Number(value.rating),
      lightBold: uiToServerTaste(value.taste.body),
      smoothTannic: uiToServerTaste(value.taste.tannin),
      drySweet: uiToServerTaste(value.taste.sweet),
      softAcidic: uiToServerTaste(value.taste.acid),
      aroma,
      content: value.content,
      wineId,
    });

    saveReviewId(wineId, review.id);

    return review;
  };
}
