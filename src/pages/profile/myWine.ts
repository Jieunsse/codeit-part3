import type { Review } from './review';

export interface MyWine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: Review;
  userId: number;
}
