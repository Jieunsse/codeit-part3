export interface PriceRange {
  min: number;
  max: number;
}

export interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  onChange?: (range: PriceRange) => void;
}
