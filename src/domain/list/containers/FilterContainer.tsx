import { PriceRangeSlider } from '@src/components/priceRangeSlider/PriceRangeSlider';
import { RatingFilter } from '@src/components/rating/RatingFilter';
import { WineTypesSection } from '../components/WineTypeSection';
import { useState } from 'react';
export function FilterContainer() {
  const [wineTypes, setWineTypes] = useState<Array<'Red' | 'White' | 'Sparkling'>>([]);

  return (
    <div className="flex h-full flex-col gap-[60px]">
      <WineTypesSection value={wineTypes} onChange={setWineTypes} />
      <PriceRangeSlider min={0} max={100000} />
      <RatingFilter onSelect={() => {}} />
    </div>
  );
}
