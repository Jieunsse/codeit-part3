import type { ReviewTaste } from './ReviewTaste';

export interface ReviewSubmitValue {
  rating: number;
  content: string;
  taste: ReviewTaste;
  aromas: string[];
}
