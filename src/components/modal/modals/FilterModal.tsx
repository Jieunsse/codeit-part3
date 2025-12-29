import { useMemo, useState } from 'react';
import { BaseModal } from './BaseModal';
import ModalButtonAdapter from '../modals/common/ModalButtonAdapter';

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

const PRICE_STEP = 10000;

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

            {(() => {
              const minPercent = maxPrice > 0 ? (priceMin / maxPrice) * 100 : 0;
              const maxPercent = maxPrice > 0 ? (priceMax / maxPrice) * 100 : 0;

              const trackStyle = {
                background: `linear-gradient(
          to right,
          #EDE9FE 0%,
          #EDE9FE ${minPercent}%,
          #7C3AED ${minPercent}%,
          #7C3AED ${maxPercent}%,
          #EDE9FE ${maxPercent}%,
          #EDE9FE 100%
        )`,
              } as React.CSSProperties;

              return (
                <div className="rangeWrap" style={trackStyle}>
                  {/* MIN thumb */}
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    step={PRICE_STEP}
                    value={priceMin}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setPriceMin(Math.min(v, priceMax - PRICE_STEP));
                    }}
                    className="rangeThumb rangeMin"
                    aria-label="최소 가격"
                  />

                  {/* MAX thumb */}
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    step={PRICE_STEP}
                    value={priceMax}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setPriceMax(Math.max(v, priceMin + PRICE_STEP));
                    }}
                    className="rangeThumb rangeMax"
                    aria-label="최대 가격"
                  />
                </div>
              );
            })()}
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
          <div className="flex-1">
            <ModalButtonAdapter
              type="button"
              cancel
              onClick={reset}
              className="h-[54px] bg-purple-100 px-9 py-4 text-[16px] leading-[26px] font-bold text-purple-700 hover:bg-purple-200"
            >
              초기화
            </ModalButtonAdapter>
          </div>

          <div className="flex-2">
            <ModalButtonAdapter
              type="button"
              onClick={apply}
              className="h-[54px] px-9 py-4 text-[16px] leading-[26px] font-bold hover:bg-purple-700"
            >
              필터 적용하기
            </ModalButtonAdapter>
          </div>
        </div>

        <style>{`
          .rangeWrap {
            position: relative;
            width: 100%;
            height: 8px;
            border-radius: 9999px;
          }

          /* 2개의 range를 겹치기 */
          .rangeThumb {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            height: 28px;
            margin: 0;
            pointer-events: none;
            margin-top: -10px;
          }

          .rangeThumb::-webkit-slider-runnable-track {
            height: 8px;
            background: transparent;
            border-radius: 9999px;
          }
          .rangeThumb::-moz-range-track {
            height: 8px;
            background: transparent;
            border-radius: 9999px;
          }

          .rangeThumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            background: #ffffff;
            border: 2px solid #d1d5db;
            border-radius: 9999px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
            pointer-events: auto;
          }
          .rangeThumb::-moz-range-thumb {
            width: 28px;
            height: 28px;
            background: #ffffff;
            border: 2px solid #d1d5db;
            border-radius: 9999px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
            pointer-events: auto;
          }

          .rangeMax {
            z-index: 2;
          }
          .rangeMin {
            z-index: 3;
          }
        `}</style>
      </div>
    </BaseModal>
  );
}
