export type WineType = 'Red' | 'White' | 'Sparkling';

export type RatingRange = 'all' | '4.8-5.0' | '4.5-4.8' | '4.0-4.5' | '3.0-4.0';

export type WineListFilterValue = {
  types: WineType[];
  priceMin: number;
  priceMax: number;
  rating: RatingRange;
};

export const DEFAULT_WINE_LIST_FILTER_VALUE: WineListFilterValue = {
  types: ['White'],
  priceMin: 0,
  priceMax: 30000000,
  rating: '4.5-4.8',
};
