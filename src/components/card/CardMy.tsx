import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import clsx from 'clsx';

import kebab from '@shared/assets/images/kebab.svg';

import { CardChip } from './CardChip';
interface CardMyProps extends BaseCardProps {
  username?: string;
  createdAt?: string;
}

/**
 * 내가 작성한 후기를 표시하는 카드 컴포넌트
 *
 * @param {CardMyProps} props - 컴포넌트 props
 * @param {number} [props.rating=4.8] - 평점
 * @param {string} [props.username='와인 러버'] - 사용자 이름
 * @param {string} [props.createdAt='2025-01-01'] - 작성일
 * @param {string} [props.text='Detail'] - 후기 내용
 *
 * @example
 * // 기본 사용
 * <CardMy />
 *
 * @example
 * // 모든 props 사용
 * <CardMy
 *   rating={4.5}
 *   username="홍길동"
 *   createdAt="2025-12-30"
 *   text="정말 훌륭한 와인입니다!"
 * />
 */
export function CardMy({
  rating = 4.8,
  username = '와인 러버',
  createdAt = '2025-01-01',
  text = 'Detail',
}: CardMyProps) {
  // 모바일(small) → md(medium) → lg(large) 반응형 고정
  const cardSizeClass = clsx(
    'w-[343px] px-[20px] py-[16px] gap-[16px]',
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
          <CardChip
            className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}
          >
            ★ {rating}
          </CardChip>
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
