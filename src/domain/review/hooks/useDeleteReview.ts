import { deleteReview } from '../apis/deleteReview';

export function useDeleteReview() {
  return async (reviewId: number) => {
    await deleteReview(reviewId);
  };
}
