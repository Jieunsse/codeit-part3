import type { RatingDistribution } from '@src/components/ratingSummary/type/types';

interface ReviewWithRating {
  rating: number;
}

export function calculateRatingDistributions(reviews: ReviewWithRating[]): RatingDistribution[] {
  const total = reviews.length;

  const counts: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review) => {
    const rating = review.rating as 1 | 2 | 3 | 4 | 5;
    counts[rating]++;
  });

  return ([5, 4, 3, 2, 1] as const).map((score) => ({
    score,
    ratio: total === 0 ? 0 : counts[score] / total,
  }));
}
