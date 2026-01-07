import { PriceRangeSlider } from '@src/components/priceRangeSlider/PriceRangeSlider';
import { RatingFilter } from '@src/components/rating/RatingFilter';
import { WineTypesSection } from '../components/WineTypeSection';
import type { WineListFilterValue } from '../types/wineListFilter.types';

type FilterContainerProps = {
  value: WineListFilterValue;
  onChange: (next: WineListFilterValue) => void;
  maxPrice?: number;
};

const PRICE_STEP = 10000;

export function FilterContainer({ value, onChange, maxPrice = 30000000 }: FilterContainerProps) {
  const setTypes = (types: WineListFilterValue['types']) => onChange({ ...value, types });
  const setPrice = ({ min, max }: { min: number; max: number }) =>
    onChange({ ...value, priceMin: min, priceMax: max });
  const setRating = (rating: WineListFilterValue['rating']) => onChange({ ...value, rating });

  return (
    <div className="flex h-full flex-col gap-[60px]">
      <WineTypesSection value={value.types} onChange={setTypes} />
      <PriceRangeSlider
        min={0}
        max={maxPrice}
        step={PRICE_STEP}
        initialMin={value.priceMin}
        initialMax={value.priceMax}
        // PC 사이드바: 드래그 중에는 API 호출하지 않고, thumb를 놓는 순간에만 커밋
        onChangeEnd={setPrice}
      />
      <RatingFilter value={value.rating} onSelect={setRating} />
    </div>
  );
}
