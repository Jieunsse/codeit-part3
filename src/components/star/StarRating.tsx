import clsx from 'clsx';

interface StarRatingProps {
  className?: string;
  maxRating?: number;
  value: number;
}

/**
 * 별점 표시 컴포넌트 (읽기 전용)
 * 고정된 별점을 표시하는 용도로 사용됩니다. 인터랙션은 없습니다.
 *
 * @param {StarRatingProps} props - 컴포넌트 props
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {number} [props.maxRating=5] - 최대 별점 개수
 * @param {number} props.value - 표시할 별점 (필수)
 *
 * @example
 * // 기본 사용
 * <StarRating value={4} />
 *
 * @example
 * // 최대 별 개수 지정
 * <StarRating value={3} maxRating={5} />
 *
 * @example
 * // 커스텀 스타일
 * <StarRating
 *   value={4.8}
 *   className="text-2xl"
 * />
 *
 * @example
 * // 카드 컴포넌트에서 사용
 * <Card>
 *   <Card.Title>{rating}</Card.Title>
 *   <StarRating value={Math.floor(rating)} className="text-lg" />
 * </Card>
 */
export function StarRating({ className, maxRating = 5, value }: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => maxRating - i);

  return (
    <div className={clsx('flex flex-row-reverse justify-end', className)}>
      {stars.map((starValue) => {
        const isSelected = starValue <= value;

        return (
          <span
            key={starValue}
            className="transition-colors"
            style={{
              color: isSelected ? 'var(--color-primary-purple-100)' : 'var(--color-gray-300)',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
