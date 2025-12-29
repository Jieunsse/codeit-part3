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
    setTypes([t]);
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

  const percent = maxPrice > 0 ? (priceMax / maxPrice) * 100 : 0;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="필터"
      titleClassName="text-[20px] leading-[32px] font-bold text-gray-800 pb-[8px]"
      maxWidthClassName="max-w-[420px]"
    >
      <div className="space-y-8">
        {/* WINE TYPES */}
        <section>
          <div className="text-[16px] leading-[26px] font-semibold text-gray-800">WINE TYPES</div>
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

        <div className="my-8 h-px w-full bg-gray-100"></div>

        {/* PRICE */}
        <section>
          <div className="text-[20px] leading-[26px] font-bold text-gray-800">PRICE</div>

          <div className="mt-3 space-y-2">
            <div className="text-medium flex justify-between text-[16px] leading-[26px] text-purple-600">
              <span>₩ {priceMin.toLocaleString()}</span>
              <span>₩ {priceMax.toLocaleString()}</span>
            </div>

            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="priceRange w-full"
              style={{
                background: `linear-gradient(
                  to right,
                  #7C3AED 0%,
                  #7C3AED ${percent}%,
                  #EDE9FE ${percent}%,
                  #EDE9FE 100%
                )`,
              }}
            />
          </div>
        </section>

        <div className="my-8 h-px w-full bg-gray-100"></div>

        {/* RATING */}
        <section>
          <div className="text-[20px] leading-[26px] font-bold text-gray-800">RATING</div>

          <div className="text-medium mt-3 space-y-2 text-[16px] leading-[26px] text-gray-800">
            {(
              [
                ['ALL', '전체'],
                ['4.8-5.0', '4.8 - 5.0'],
                ['4.5-4.8', '4.5 - 4.8'],
                ['4.0-4.5', '4.0 - 4.5'],
                ['3.0-4.0', '3.0 - 4.0'],
              ] as const
            ).map(([val, label]) => (
              <label key={val} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="rating"
                  checked={rating === val}
                  onChange={() => setRating(val)}
                  className="peer sr-only"
                />

                <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white transition peer-checked:border-violet-600 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 peer-focus-visible:ring-offset-2 after:absolute after:h-2.5 after:w-2.5 after:scale-75 after:rounded-[3px] after:bg-violet-600 after:opacity-0 after:transition after:content-[''] peer-checked:after:scale-100 peer-checked:after:opacity-100" />

                <span className="text-gray-800 peer-checked:text-violet-600">{label}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={reset}
            className="h-[54px] flex-1 rounded-xl bg-purple-100 px-9 py-4 pb-6 text-[16px] font-bold text-purple-700 hover:bg-purple-200"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={apply}
            className="h-[54px] flex-2 rounded-xl bg-violet-600 px-9 py-4 text-[16px] font-bold text-white hover:bg-violet-700"
          >
            필터 적용하기
          </button>
        </div>

        <style>{`
          .priceRange {
            -webkit-appearance: none;
            appearance: none;
            height: 8px;
            border-radius: 9999px;
            outline: none;
            cursor: pointer;
          }

          .priceRange::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 9999px;
            background: transparent;
          }

          .priceRange::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            background: #ffffff;
            border: 2px solid #D1D5DB;
            border-radius: 9999px;
            margin-top: -10px; /* 트랙 중앙정렬 */
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          }

          .priceRange::-moz-range-track {
            height: 8px;
            border-radius: 9999px;
            background: transparent;
          }

          .priceRange::-moz-range-thumb {
            width: 28px;
            height: 28px;
            background: #ffffff;
            border: 2px solid #D1D5DB;
            border-radius: 9999px;
          }
        `}</style>
      </div>
    </BaseModal>
  );
}
