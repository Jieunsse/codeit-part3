import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import clsx from 'clsx';

import kebab from '@shared/assets/images/kebab.svg';

import { Chip } from './CardChip';
interface CardMyProps extends BaseCardProps {
  username?: string;
  createdAt?: string;
}

export function CardMy({
  rating = 4.8,
  size,
  username = '와인 러버',
  createdAt = '2025-01-01',
  text = 'Detail',
}: CardMyProps) {
  const cardSizeClass = clsx(
    size
      ? {
          small: 'w-[343px] px-[20px] py-[16px] gap-[16px]',
          medium: 'w-[704px] px-[24px] py-[20px] gap-[18px]',
          large: 'w-[800px] px-[30px] py-[24px] gap-[20px]',
        }[size]
      : 'w-[343px] px-[20px] py-[16px] gap-[16px]',
    'h-full',
    'md:w-[704px] md:px-[24px] md:py-[20px] md:gap-[18px]',
    'lg:w-[800px] lg:px-[30px] lg:py-[24px] lg:gap-[20px]',
  );

  const titleClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const timetextClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const textClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const chipClass = 'text-[14px] md:text-[18px] lg:text-[18px]';
  const iconSizeClass = 'h-[24px] w-[24px] md:h-[26px] md:w-[26px] lg:h-[26px] lg:w-[26px]';

  return (
    <Card className={clsx('flex flex-col', cardSizeClass)}>
      <Card.Container className="flex flex-row items-center justify-between">
        <Card.Container className="flex flex-row items-center justify-between gap-[24px]">
          <Chip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
            ★ {rating}
          </Chip>
          <Card.Text className={clsx(timetextClass)} style={{ color: 'var(--color-gray-500)' }}>
            {createdAt}
          </Card.Text>
        </Card.Container>
        <Card.Icon className={clsx(iconSizeClass, 'cursor-pointer hover:opacity-80')}>
          <img src={kebab} alt="kebab" className="h-full w-full object-contain" />
        </Card.Icon>
      </Card.Container>
      <Card.Container className="flex flex-col justify-between gap-[8px]">
        <Card.Title className={clsx(titleClass)} style={{ color: 'var(--color-gray-500)' }}>
          {username}
        </Card.Title>
        <Card.Text className={clsx(textClass)} style={{ color: 'var(--color-gray-800)' }}>
          {text}
        </Card.Text>
      </Card.Container>
    </Card>
  );
}
