export type RatingDistribution = {
  score: 1 | 2 | 3 | 4 | 5;
  ratio: number;
};

export interface RatingSummaryProps {
  average: number;
  reviewCount: number;
  distributions: RatingDistribution[];
}
