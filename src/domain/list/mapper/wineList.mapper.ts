import type { Wine } from '@src/pages/wines/apis/wines';

export type WineListCardItem = {
  id: string;
  title: string;
  text: string;
  imageUrl?: string;
  price: number;
  rating: number;
  reviewNumber: number;
  review: string;
};

export function toWineListCardItems(wines: Wine[]): WineListCardItem[] {
  return wines.map((wine) => ({
    id: String(wine.id),
    title: wine.name,
    text: wine.region,
    imageUrl: wine.image,
    price: wine.price ?? 0,
    rating: wine.avgRating ?? 0,
    reviewNumber: wine.reviewCount ?? 0,
    review: wine.recentReview?.content ?? '최신 후기가 없어요',
  }));
}
