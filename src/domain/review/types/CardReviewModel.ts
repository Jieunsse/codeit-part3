export interface CardReviewModel {
  reviewId: number;
  isLiked: boolean;
  username: string;
  createdAt: string;
  text: string;
  chips: { title: string }[];
  mainChip: {
    label: string;
    value: number | string;
  };
  flavorValue: {
    body: number;
    tannin: number;
    sweet: number;
    acid: number;
  };
}
