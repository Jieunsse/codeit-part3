import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import wine2 from '@shared/assets/images/wine2.svg';
import clsx from 'clsx';
import { Chip } from './CardChip';

interface CardDetailProps extends BaseCardProps {
  price?: number;
}

export function CardDetail({ size = 'large', text = 'Detail', price = 10000 }: CardDetailProps) {
  // size에 따른 스타일 결정
  const cardSizeClass = {
    small: 'w-[343px] h-[164px] px-[20px] py-[16px] pb-[0px]',
    medium: 'w-[704px] h-[228px] pl-[60px] py-[20px] pb-[0px]',
    large: 'w-[800px] h-[228px] pl-[100px] py-[24px] pb-[0px]',
  }[size || 'large'];

  const imageSizeClass = {
    small: 'w-[53px] h-[185px]',
    medium: 'w-[76px] h-[270px] ',
    large: 'w-[53px] h-[185px] ',
  }[size || 'large'];

  const imagePositionSizeClass = {
    small: 'w-[60px]',
    medium: 'w-[80px]',
    large: 'w-[80px]',
  }[size || 'large'];

  const textClass = {
    small: 'text-[14px]',
    medium: 'text-[16px]',
    large: 'text-[16px]',
  }[size || 'large'];

  const titleClass = {
    small: 'text-[20px]',
    medium: 'text-[30px]',
    large: 'text-[30px]',
  }[size || 'large'];

  const chipClass = {
    small: 'text-[14px]',
    medium: 'text-[18px]',
    large: 'text-[18px]',
  }[size || 'large'];

  const bodyClass = size === 'small' ? 'w-4/5' : 'w-3/5';

  return (
    <Card className={clsx('flex flex-row', cardSizeClass)}>
      <Card.Container className="relative flex flex-row items-end gap-[28px] overflow-visible">
        <Card.Body className={clsx(imagePositionSizeClass, 'relative h-full')}>
          <Card.Image
            src={wine2}
            alt="Wine"
            className={clsx(imageSizeClass, 'absolute bottom-0 left-0 object-cover')}
          />
        </Card.Body>

        <Card.Body
          className={clsx(bodyClass, 'flex h-full flex-col items-start justify-start gap-[10px]')}
        >
          <Card.Title
            className={titleClass}
            style={{ fontWeight: '700', color: 'var(--color-gray-800)' }}
          >
            {text}
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
