import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { PriceRangeSliderProps } from './types/priceRangeSlider.types';
import { calculatePercentage, clampMaxValue, clampMinValue } from './utils/priceRange.calculations';
import { SLIDER } from './constants/PriceRangeSlider';
import { rangeInput } from './style/priceRangeSlider.style';

/**
 * 가격 범위를 선택하기 위한 양방향 슬라이더 컴포넌트
 *
 * 두 개의 슬라이더 핸들을 사용해 최소값(min)과 최대값(max) 사이의
 * 가격 범위를 선택할 수 있습니다.
 *
 * ### 동작 규칙
 * - 시작점은 끝점을 초과할 수 없습니다.
 * - 끝점은 시작점보다 작아질 수 없습니다.
 * - 값 변경은 step 단위로 이루어집니다.
 *
 * ### 사용 방법
 * - min / max는 슬라이더의 전체 범위를 정의합니다.
 * - initialMin / initialMax로 초기 선택 범위를 설정할 수 있습니다.
 * - 값이 변경될 때마다 onChange 콜백을 통해 선택된 범위를 전달합니다.
 *
 * @example
 * ```tsx
 * <PriceRangeSlider
 *   min={0}
 *   max={100000}
 *   step={1000}
 *   initialMin={30000}
 *   initialMax={70000}
 *   onChange={({ min, max }) => {
 *     선택된 가격 범위를 기반으로 데이터를 필터링하거나 조회하는 로직을 작성해주세요.
 *   }}
 * />
 * ```
 */
export function PriceRangeSlider({
  min,
  max,
  step = 1000,
  initialMin = min,
  initialMax = max,
  onChange,
}: PriceRangeSliderProps) {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const minPercent = calculatePercentage(minValue, min, max);
  const maxPercent = calculatePercentage(maxValue, min, max);

  const updateMinValue = (nextValue: number) => {
    const value = clampMinValue(nextValue, maxValue, step);
    setMinValue(value);
    onChange?.({ min: value, max: maxValue });
  };

  const updateMaxValue = (nextValue: number) => {
    const value = clampMaxValue(nextValue, minValue, step);
    setMaxValue(value);
    onChange?.({ min: minValue, max: value });
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-bold text-gray-800">PRICE</h2>

      <div className="text-primary-purple-100 flex justify-between text-lg font-medium">
        <span>₩{minValue.toLocaleString()}</span>
        <span>₩{maxValue.toLocaleString()}</span>
      </div>

      <div className="relative" style={{ height: SLIDER.THUMB_SIZE }}>
        <div
          className="bg-primary-purple-10 absolute top-1/2 w-full -translate-y-1/2 rounded-full"
          style={{ height: SLIDER.TRACK_HEIGHT }}
        />

        <div
          className="bg-primary-purple-100 absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            height: SLIDER.TRACK_HEIGHT,
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => updateMinValue(Number(e.target.value))}
          className={twMerge(rangeInput({ z: 'front' }))}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => updateMaxValue(Number(e.target.value))}
          className={twMerge(rangeInput({ z: 'back' }))}
        />
      </div>
    </div>
  );
}
