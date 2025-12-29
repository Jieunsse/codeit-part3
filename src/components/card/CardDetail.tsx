import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import wine2 from '@shared/assets/images/wine2.svg';
import clsx from 'clsx';
import { Chip } from './CardChip';

interface CardDetailProps extends BaseCardProps {
  price?: number;
}

export function CardDetail({
  size,
  text = 'Detail',
  price = 10000,
  title = 'Title',
}: CardDetailProps) {
  // size에 따른 스타일 결정
  const cardSizeClass = clsx(
    size
      ? {
          small: 'w-[343px] h-[164px] px-[20px] py-[16px] pb-[0px]',
          medium: 'w-[704px] h-[228px] pl-[60px] py-[20px] pb-[0px]',
          large: 'w-[800px] h-[228px] pl-[80px] py-[24px] pb-[0px]',
        }[size]
      : 'w-[343px] h-[164px] px-[20px] py-[16px] pb-[0px]',
    'md:w-[704px] md:h-[228px] md:pl-[60px] md:py-[20px] md:pb-[0px]',
    'lg:w-[800px] lg:h-[228px] lg:pl-[80px] lg:py-[24px] lg:pb-[0px]',
  );

  const imagePositionSizeClass = 'w-[60px] md:w-[80px] lg:w-[80px]';
  const textClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const titleClass = 'text-[20px] md:text-[30px] lg:text-[30px]';
  const chipClass = 'text-[14px] md:text-[18px] lg:text-[18px]';
  const imageCoverClass = 'object-contain md:object-contain lg:object-contain';
  const bodyClass = 'w-4/5 md:w-3/5';

  return (
    <Card className={clsx('flex flex-row', cardSizeClass)}>
      <Card.Container className="relative flex w-full flex-row items-end gap-[28px] overflow-visible">
        <Card.Body className={clsx(imagePositionSizeClass, 'relative h-full')}>
          <Card.Image
            src={wine2}
            alt="Wine"
            className={clsx(imageCoverClass, 'absolute bottom-0 left-0 h-full w-full')}
          />
        </Card.Body>

        <Card.Body
          className={clsx(bodyClass, 'flex h-full flex-col items-start justify-start gap-[10px]')}
        >
          <Card.Title
            className={titleClass}
            style={{ fontWeight: '700', color: 'var(--color-gray-800)' }}
          >
            {title}
          </Card.Title>
          <Card.Text className={clsx(textClass)} style={{ color: 'var(--color-gray-500)' }}>
            {text}
          </Card.Text>
          <Chip className={clsx(chipClass)}>₩ {price?.toLocaleString()}</Chip>
        </Card.Body>
      </Card.Container>
    </Card>
  );
}
