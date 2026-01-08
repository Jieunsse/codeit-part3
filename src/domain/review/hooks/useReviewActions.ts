import { useDeleteReview } from './useDeleteReview';
import type { ReviewResponse } from '../types/ReviewResponse';
import { useToggleReviewLike } from './useToogleReviewLike';

export function useReviewActions(
  setReviews: React.Dispatch<React.SetStateAction<ReviewResponse[]>>,
) {
  const toggleLike = useToggleReviewLike();
  const deleteReview = useDeleteReview();

  const handleToggleLike = async (reviewId: number) => {
    const result = await toggleLike(reviewId);

    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isLiked: result.isLiked } : r)),
    );
  };

  const handleDeleteReview = async (reviewId: number) => {
    await deleteReview(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  return {
    handleToggleLike,
    handleDeleteReview,
  };
}
