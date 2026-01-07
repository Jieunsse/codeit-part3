/**
 * 와인 목록 필터 모달
 *
 * ## 목적
 * - 와인 목록 필터(타입/가격/평점)를 선택하고 적용(onApply)하는 모달입니다.
 * - "초기화" 버튼으로 DEFAULT 값으로 되돌릴 수 있습니다.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * const [filter, setFilter] = useState<FilterValue>();
 *
 * <FilterModal
 *   // 열 때마다 초기값 반영이 필요하면 부모에서 key로 remount
 *   key={open ? 'open' : 'closed'}
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   initialValue={filter}
 *   maxPrice={30000000}
 *   onApply={(v) => setFilter(v)}
 * />
 * ```
 */

import { useMemo, useState } from 'react';
import { BaseModal } from './BaseModal';
import ModalButtonAdapter from '../modals/common/ModalButtonAdapter';

import { Chips } from '../../chips/Chips';
import { RatingFilter } from '../../rating/RatingFilter';
import { PriceRangeSlider } from '@src/components/priceRangeSlider/PriceRangeSlider';
import type {
  RatingRange,
  WineListFilterValue,
  WineType,
} from '@src/domain/list/types/wineListFilter.types';
import { DEFAULT_WINE_LIST_FILTER_VALUE } from '@src/domain/list/types/wineListFilter.types';

// 다른 모달(예: WineRegisterModal, FilterRegisterModal)에서 import 하던 타입 호환성 유지용
export type { WineType, RatingRange };

export type FilterValue = WineListFilterValue;

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: FilterValue;
  onApply: (value: FilterValue) => void;
  maxPrice?: number;
};

const PRICE_STEP = 10000;

const DEFAULT: FilterValue = DEFAULT_WINE_LIST_FILTER_VALUE;

export function FilterModal({
  isOpen,
  onClose,
  initialValue,
  onApply,
  maxPrice = 30000000,
}: FilterModalProps) {
  const init = useMemo(() => initialValue ?? DEFAULT, [initialValue]);

  const [types, setTypes] = useState<WineType[]>(() => init.types);
  const [priceMin, setPriceMin] = useState(() => init.priceMin);
  const [priceMax, setPriceMax] = useState(() => init.priceMax);
  const [rating, setRating] = useState<RatingRange>(() => init.rating);

  const [priceKey, setPriceKey] = useState(0);
  const [ratingKey, setRatingKey] = useState(0);

  const reset = () => {
    setTypes(DEFAULT.types);
    setPriceMin(DEFAULT.priceMin);
    setPriceMax(DEFAULT.priceMax);
    setRating(DEFAULT.rating);

    setPriceKey((k) => k + 1);
    setRatingKey((k) => k + 1);
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
            {(['Red', 'White', 'Sparkling'] as WineType[]).map((t) => (
              <Chips key={t} title={t} selected={types.includes(t)} onClick={() => setTypes([t])} />
            ))}
          </div>
        </section>

        <div className="my-8 h-px w-full bg-gray-100" />

        {/* PRICE */}
        <div className="w-full" style={{ width: '100%' }}>
          <section>
            <PriceRangeSlider
              key={priceKey}
              min={0}
              max={maxPrice}
              step={PRICE_STEP}
              initialMin={priceMin}
              initialMax={priceMax}
              onChange={({ min, max }) => {
                setPriceMin(min);
                setPriceMax(max);
              }}
            />
          </section>
        </div>

        <div className="my-8 h-px w-full bg-gray-100" />

        {/* RATING */}
        <section>
          <div className="rating-press-scope">
            <RatingFilter
              key={ratingKey}
              value={rating}
              onSelect={(key) => {
                setRating(key);
              }}
            />
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
      </div>

      <style>{`
        /* 체크 내부(보라색 작은 네모) 등장 애니메이션 */
        .rating-press-scope button > span:first-child > span {
          animation: checkFill 220ms ease-out;
          transform-origin: center;
        }

        @keyframes checkFill {
          0%   { transform: scale(0.2); opacity: 0; }
          60%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* (선택) 좀 더 '천천히 채워지는' 느낌으로 부드럽게 */
        /* .rating-press-scope button > span:first-child > span {
            animation: checkFill 300ms cubic-bezier(.2,.8,.2,1);
          }
        */
      `}</style>
    </BaseModal>
  );
}
