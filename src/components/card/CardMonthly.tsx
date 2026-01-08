import { Card } from './Card';
import { StarRating } from '../star/StarRating';
import wine1 from '@shared/assets/images/wine1.svg';
import clsx from 'clsx';
import type { BaseCardProps } from './Card.types';

/**
 * 이달의 와인을 표시하는 컴팩트한 카드 컴포넌트
 *
 * @param {BaseCardProps} props - 컴포넌트 props
 * @param {number} [props.rating=4.8] - 와인 평점
 * @param {string} [props.title='Title'] - 부제목 텍스트
 *
 * @example
 * // 기본 사용
 * <CardMonthly />
 *
 * @example
 * // props 사용
 * <CardMonthly
 *   rating={4.9}
 *   title="이달의 추천 와인"
 * />
 */
type CardMonthlyProps = BaseCardProps & {
  imageUrl?: string;
};

export function CardMonthly({
  imageUrl,
  rating = 4.8,
  title = 'Title',
  className,
}: CardMonthlyProps) {
  const formattedRating = Number.isFinite(rating) ? rating.toFixed(1) : '0.0';
  // 모바일(small) → md 이상(large)로 반응형 고정
  const cardSizeClass = clsx(
    'w-[193px] h-[160px] px-[25px] py-[24px] pb-[0px]',
    'md:w-[232px] md:h-[185px] md:px-[30px] md:py-[24px] md:pb-[0px]',
    'lg:w-[232px] lg:h-[185px] lg:px-[30px] lg:py-[24px] lg:pb-[0px]',
  );

  const titleClass = 'text-[28px] md:text-[36px] lg:text-[36px]';
  const starRatingClass = 'text-[12px] md:text-[18px] lg:text-[18px]';
  const textClass = 'text-[10px] md:text-[12px] lg:text-[12px]';

  return (
    <Card
      className={clsx(
        'flex flex-row items-center justify-center gap-[28px]',
        cardSizeClass,
        className,
      )}
    >
      <Card.Image
        src={imageUrl ?? wine1}
        alt="Wine"
        className={clsx('h-full w-full object-contain')}
      />
      <Card.Body className="flex h-full w-full flex-col items-start justify-start gap-1">
        <Card.Title
          className={titleClass}
          style={{
            fontWeight: '800',
            color: 'var(--color-gray-800)',
            lineHeight: '1',
          }}
        >
          {formattedRating}
        </Card.Title>
        <StarRating value={Math.floor(rating)} className={starRatingClass} />
        <Card.Text
          className={textClass}
          style={{
            color: 'var(--color-gray-500)',
            fontWeight: 'var(--font-weight-regular)',
          }}
        >
          {title}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
