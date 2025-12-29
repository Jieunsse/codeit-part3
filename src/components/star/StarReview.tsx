import { useState } from 'react';
import clsx from 'clsx';

interface StarReviewProps {
  className?: string;
  maxRating?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  name?: string;
}

/**
 * 별점 입력 컴포넌트 (인터랙티브)
 * 사용자가 클릭하여 별점을 선택할 수 있으며, 마우스 호버 시 미리보기를 제공합니다.
 *
 * @param {StarReviewProps} props - 컴포넌트 props
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {number} [props.maxRating=5] - 최대 별점 개수
 * @param {number} [props.defaultValue=0] - 초기 선택된 별점
 * @param {function} [props.onChange] - 별점 변경 시 호출되는 콜백 함수
 * @param {string} [props.name='score'] - input의 name 속성
 *
 * @example
 * // 기본 사용
 * <StarReview />
 *
 * @example
 * // 초기값과 변경 이벤트 처리
 * <StarReview
 *   defaultValue={3}
 *   maxRating={5}
 *   onChange={(rating) => console.log('선택된 별점:', rating)}
 *   name="wine-rating"
 * />
 *
 * @example
 * // 커스텀 스타일
 * <StarReview
 *   className="text-3xl"
 *   defaultValue={4}
 *   onChange={(rating) => setRating(rating)}
 * />
 */
export function StarReview({
  className,
  maxRating = 5,
  defaultValue = 0,
  onChange,
  name = 'score',
}: StarReviewProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(defaultValue);

  const handleChange = (rating: number) => {
    setSelectedRating(rating);
    onChange?.(rating);
  };

  const stars = Array.from({ length: maxRating }, (_, i) => maxRating - i);

  return (
    <div className={clsx('flex flex-row-reverse justify-end text-xl', className)}>
      <label htmlFor={name} className="sr-only">
        별점
      </label>
      {stars.map((starValue) => {
        const isSelected = starValue <= selectedRating;
        const isHovered = starValue <= hoveredRating;

        return (
          <div key={starValue} className="relative">
            <input
              type="radio"
              className="peer hidden"
              id={`${name}-${starValue}`}
              value={starValue}
              name={name}
              checked={starValue === selectedRating}
              onChange={() => handleChange(starValue)}
            />
            <label
              htmlFor={`${name}-${starValue}`}
              className="cursor-pointer transition-colors"
              style={{
                color:
                  isSelected || isHovered
                    ? 'var(--color-primary-purple-100)'
                    : 'var(--color-gray-300)',
              }}
              onMouseEnter={() => setHoveredRating(starValue)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              ★
            </label>
          </div>
        );
      })}
    </div>
  );
}
