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
  /** 드래그/조작을 끝냈을 때(thumb를 놓았을 때) 한 번만 호출 */
  onChangeEnd?: (range: PriceRange) => void;
}
