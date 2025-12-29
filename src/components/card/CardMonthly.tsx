import { Card } from './Card';
import { StarRating } from '../star/StarRating';
import wine1 from '@shared/assets/images/wine1.svg';
import clsx from 'clsx';
import type { BaseCardProps } from './Card.types';

export function CardMonthly({ size, rating = 4.8, title = 'Title' }: BaseCardProps) {
  // size에 따른 스타일 결정
  const cardSizeClass = clsx(
    size === 'small'
      ? 'w-[193px] h-[160px] px-[25px] py-[24px] pb-[0px]'
      : 'w-[232px] h-[185px] px-[30px] py-[24px] pb-[0px]',
    'md:w-[232px] md:h-[185px] md:px-[30px] md:py-[24px] md:pb-[0px]',
    'lg:w-[232px] lg:h-[185px] lg:px-[30px] lg:py-[24px] lg:pb-[0px]',
  );

  const titleClass = 'text-[28px] md:text-[36px] lg:text-[36px]';
  const starRatingClass = 'text-[12px] md:text-[18px] lg:text-[18px]';
  const textClass = 'text-[10px] md:text-[12px] lg:text-[12px]';

  return (
    <Card className={clsx('flex flex-row items-center justify-center gap-[28px]', cardSizeClass)}>
      <Card.Image src={wine1} alt="Wine" className={clsx('h-full w-full object-contain')} />
      <Card.Body className="flex h-full w-full flex-col items-start justify-start gap-1">
        <Card.Title
          className={titleClass}
          style={{
            fontWeight: '800',
            color: 'var(--color-gray-800)',
            lineHeight: '1',
          }}
        >
          {rating}
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
