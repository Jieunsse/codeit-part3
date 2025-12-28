import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import clsx from 'clsx';
import { ProfileImg } from '../profileImg/ProfileImg';
import profileimg from '@shared/assets/images/profile.svg';
import kebab from '@shared/assets/images/kebab.svg';
import heart from '@shared/assets/images/heart.svg';
import updown from '@shared/assets/images/updown.svg';
import { useState } from 'react';

import { Chip } from './CardChip';
interface CardReviewProps extends BaseCardProps {
  username?: string;
  createdAt?: string;
}

export function CardReview({
  rating = 4.8,
  size = 'large',
  username = '와인 러버',
  createdAt = '2025-01-01',
  text = 'Detail',
}: CardReviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const cardSizeClass = {
    small: 'w-full h-full px-[20px] py-[16px] pb-[0px] gap-[16px]',
    medium: 'w-full h-full px-[24px] py-[20px] pb-[0px] gap-[18px]',
    large: 'w-full h-full px-[30px] py-[24px] pb-[0px] gap-[20px]',
  }[size || 'large'];

  const titleClass = {
    small: 'text-[16px]',
    medium: 'text-[18px]',
    large: 'text-[18px]',
  }[size || 'large'];

  const timetextClass = {
    small: 'text-[14px]',
    medium: 'text-[16px]',
    large: 'text-[16px]',
  }[size || 'large'];

  const textClass = {
    small: 'text-[14px]',
    medium: 'text-[16px]',
    large: 'text-[16px]',
  }[size || 'large'];

  const chipClass = {
    small: 'text-[14px]',
    medium: 'text-[18px]',
    large: 'text-[18px]',
  }[size || 'large'];

  return (
    <Card className={clsx('flex flex-col', cardSizeClass)}>
      <Card.Container className="flex flex-row items-center justify-between">
        <Card.Container className="flex flex-row items-center gap-[12px]">
          <ProfileImg src={profileimg} alt="profile" size={50} />
          <Card.Container>
            <Card.Title
              className={clsx(titleClass)}
              style={{ fontWeight: '600', color: 'var(--color-gray-800)' }}
            >
              {username}
            </Card.Title>
            <Card.Text className={clsx(timetextClass)} style={{ color: 'var(--color-gray-500)' }}>
              {createdAt}
            </Card.Text>
          </Card.Container>
        </Card.Container>

        <Card.Container className="flex flex-row items-center justify-between gap-[24px]">
          <Card.Icon className="h-[38px] w-[38px] cursor-pointer hover:opacity-80">
            <img src={heart} alt="heart" />
          </Card.Icon>
          <Card.Icon className="h-[38px] w-[38px] cursor-pointer hover:opacity-80">
            <img src={kebab} alt="kebab" className="h-full w-full object-contain" />
          </Card.Icon>
        </Card.Container>
      </Card.Container>
      <Card.Container className="flex items-center justify-between">
        <Card.Container className="flex flex-row items-center gap-[4px]">
          <Chip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
            ★ {rating}
          </Chip>
          <Chip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
            ★ {rating}
          </Chip>
          <Chip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
            ★ {rating}
          </Chip>
        </Card.Container>
        <Chip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
          ★ {rating}
        </Chip>
      </Card.Container>

      {/* 텍스트 영역 - 접혔을 때는 숨김 */}
      {isExpanded && (
        <Card.Container>
          <Card.Text className={clsx(textClass)} style={{ color: 'var(--color-gray-800)' }}>
            {text}
          </Card.Text>
        </Card.Container>
      )}

      {/* 토글 버튼 - 클릭 시 180도 회전 */}
      <Card.Icon
        className="h-[30px] w-[30px] cursor-pointer self-center transition-transform duration-300 hover:opacity-80"
        style={{
          transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={updown} alt="updown" className="h-[30px] w-[30px] object-contain" />
      </Card.Icon>
    </Card>
  );
}
