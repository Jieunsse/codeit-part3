import { Card } from './Card';
import { StarRating } from '../star/StarRating';
import wine1 from '@shared/assets/images/wine1.svg';
import clsx from 'clsx';

interface CardMonthlyProps {
  size?: 'small' | 'large';
  rating?: number;
  text?: string;
}

export function CardMonthly({ size = 'large', rating = 4.8, text = 'Monthly' }: CardMonthlyProps) {
  // size에 따른 스타일 결정
  const titleClass = size === 'small' ? 'text-[28px]' : 'text-[36px]';
  const starRatingClass = size === 'small' ? 'text-[12px]' : 'text-[18px]';
  const imageClass = size === 'small' ? 'w-[38px] h-[136px]' : 'w-[44px] h-[161px]';
  const textClass = size === 'small' ? 'text-[10px]' : 'text-[12px]';

  return (
    <Card size={size} className="flex flex-row items-center justify-center gap-[28px]">
      <Card.Body className="h-full">
        <Card.Image src={wine1} alt="Wine" className={clsx(imageClass, 'h-full')} />
      </Card.Body>
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
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
