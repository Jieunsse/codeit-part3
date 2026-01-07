export type RatingRange = 'all' | '4.8-5.0' | '4.5-4.8' | '4.0-4.5' | '3.0-4.0';

export interface RatingFilterProps {
  value?: RatingRange;
  initialValue?: RatingRange;
  onSelect: (rating: RatingRange) => void;
}
