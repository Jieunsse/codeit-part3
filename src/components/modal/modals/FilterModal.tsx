import { useMemo, useState } from 'react';
import { BaseModal } from './BaseModal';

export type WineType = 'Red' | 'White' | 'Sparkling';
export type RatingRange = 'ALL' | '4.8-5.0' | '4.5-4.8' | '4.0-4.5' | '3.0-4.0';

export type FilterValue = {
  types: WineType[];
  priceMin: number;
  priceMax: number;
  rating: RatingRange;
};

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: FilterValue;
  onApply: (value: FilterValue) => void;
  maxPrice?: number;
};

const DEFAULT: FilterValue = {
  types: ['White'],
  priceMin: 0,
  priceMax: 30000000,
  rating: '4.5-4.8',
};

export function FilterModal({
  isOpen,
  onClose,
  initialValue,
  onApply,
  maxPrice = 30000000,
}: FilterModalProps) {
  const init = useMemo(() => initialValue ?? DEFAULT, [initialValue]);
  const [types, setTypes] = useState<WineType[]>(init.types);
  const [priceMin, setPriceMin] = useState(init.priceMin);
  const [priceMax, setPriceMax] = useState(init.priceMax);
  const [rating, setRating] = useState<RatingRange>(init.rating);

  const toggleType = (t: WineType) => {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const reset = () => {
    setTypes(DEFAULT.types);
    setPriceMin(DEFAULT.priceMin);
    setPriceMax(DEFAULT.priceMax);
    setRating(DEFAULT.rating);
  };

  const apply = () => {
    onApply({ types, priceMin, priceMax, rating });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="필터" maxWidthClassName="max-w-[420px]">
      <div className="space-y-6">
        {/* WINE TYPES */}
        <section>
          <div className="text-xs font-semibold text-gray-500">WINE TYPES</div>
          <div className="mt-3 flex gap-2">
            {(['Red', 'White', 'Sparkling'] as WineType[]).map((t) => {
              const active = types.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleType(t)}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-medium',
                    active
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50',
                  ].join(' ')}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>

        {/* PRICE */}
        <section>
          <div className="text-xs font-semibold text-gray-500">PRICE</div>

          {/* 팀원 Slider 들어오면 여기 교체 */}
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>₩ {priceMin.toLocaleString()}</span>
              <span>₩ {priceMax.toLocaleString()}</span>
            </div>

            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full"
            />

            <div className="text-[11px] text-gray-400">
              드래그 범위: 0 ~ {maxPrice.toLocaleString()}원
            </div>
          </div>
        </section>

        {/* RATING */}
        <section>
          <div className="text-xs font-semibold text-gray-500">RATING</div>
          <div className="mt-3 space-y-2">
            {(
              [
                ['ALL', '전체'],
                ['4.8-5.0', '4.8 - 5.0'],
                ['4.5-4.8', '4.5 - 4.8'],
                ['4.0-4.5', '4.0 - 4.5'],
                ['3.0-4.0', '3.0 - 4.0'],
              ] as const
            ).map(([val, label]) => (
              <label
                key={val}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={rating === val}
                  onChange={() => setRating(val)}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* footer buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="h-12 flex-1 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={apply}
            className="h-12 flex-1 rounded-xl bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700"
          >
            필터 적용하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
