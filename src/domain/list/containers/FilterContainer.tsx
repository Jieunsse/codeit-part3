import { PriceRangeSlider } from '@src/components/priceRangeSlider/PriceRangeSlider';
import { RatingFilter } from '@src/components/rating/RatingFilter';
import { WineTypesSection } from '../components/WineTypeSection';

import { useState } from 'react';
import Button from '@src/components/button/Button';
export function FilterContainer() {
  const [wineTypes, setWineTypes] = useState<Array<'Red' | 'White' | 'Sparkling'>>([]);

  return (
    <div className="flex flex-col gap-[60px]">
      <WineTypesSection value={wineTypes} onChange={setWineTypes} />
      <PriceRangeSlider min={0} max={100000} />
      <RatingFilter onSelect={() => {}} />
      <Button>
        <span>와인 등록하기</span>
      </Button>
    </div>
  );
}
