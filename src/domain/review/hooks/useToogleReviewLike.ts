import { toggleReviewLike } from '../apis/toogleReviewLike';

export function useToggleReviewLike() {
  return async (reviewId: number) => {
    return await toggleReviewLike(reviewId);
  };
}
