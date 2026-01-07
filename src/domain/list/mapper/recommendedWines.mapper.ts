import type { RecommendedWine } from '@src/pages/wines/apis/recommendedWines';
import type { RecommendedItem } from '../components/Recommended';

export function toRecommendedItems(recommendedWines: RecommendedWine[]): RecommendedItem[] {
  return recommendedWines.map((wine) => ({
    id: String(wine.id),
    rating: wine.avgRating ?? 0,
    title: wine.name,
    imageUrl: wine.image,
  }));
}
