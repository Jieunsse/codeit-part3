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

/**
 * 칩 데이터 인터페이스
 * @property {string} label - 칩 라벨 (예: '향', '맛', '★')
 * @property {number | string} value - 칩 값 (예: 4.8, '달콤함')
 */
interface ChipData {
  label: string;
  value: number | string;
}

interface CardReviewProps extends BaseCardProps {
  username?: string;
  createdAt?: string;
  chips?: ChipData[];
  mainChip?: ChipData;
}

/**
 * 와인 후기를 표시하는 카드 컴포넌트 (접기/펼치기 기능 포함)
 *
 * @param {CardReviewProps} props - 컴포넌트 props
 * @param {string} [props.size] - 카드 크기 (small, medium, large). 기본값: 반응형
 * @param {string} [props.username='와인 러버'] - 사용자 이름
 * @param {string} [props.createdAt='2025-01-01'] - 작성일
 * @param {string} [props.text='Detail'] - 후기 내용
 * @param {ChipData[]} [props.chips] - 왼쪽 칩 목록 (향, 맛, 여운 등)
 * @param {ChipData} [props.mainChip] - 오른쪽 메인 칩 (종합 평점)
 *
 * @example
 * // 기본 사용
 * <CardReview />
 *
 * @example
 * // 모든 props 사용
 * <CardReview
 *   size="large"
 *   username="홍길동"
 *   createdAt="2025-12-30"
 *   text="부드럽고 풍부한 맛이 일품입니다."
 *   chips={[
 *     { label: '향', value: 4.5 },
 *     { label: '맛', value: 4.8 },
 *     { label: '여운', value: 4.2 }
 *   ]}
 *   mainChip={{ label: '종합', value: 4.5 }}
 * />
 */
export function CardReview({
  size,
  username = '와인 러버',
  createdAt = '2025-01-01',
  text = 'Detail',
  chips = [
    { label: '★', value: 4.8 },
    { label: '★', value: 4.8 },
    { label: '★', value: 4.8 },
  ],
  mainChip = { label: '★', value: 4.8 },
}: CardReviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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

  const titleClass = 'text-[16px] md:text-[18px] lg:text-[18px]';
  const timetextClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const textClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const iconSizeClass = 'h-[32px] w-[32px] md:h-[38px] md:w-[38px] lg:h-[38px] lg:w-[38px]';
  const chipClass = 'text-[14px] md:text-[18px] lg:text-[18px]';

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
          <Card.Icon className={clsx(iconSizeClass, 'cursor-pointer hover:opacity-80')}>
            <img src={heart} alt="heart" />
          </Card.Icon>
          <Card.Icon className={clsx(iconSizeClass, 'cursor-pointer hover:opacity-80')}>
            <img src={kebab} alt="kebab" className="h-full w-full object-contain" />
          </Card.Icon>
        </Card.Container>
      </Card.Container>
      <Card.Container className="flex items-center justify-between">
        <Card.Container className="flex flex-row items-center gap-[4px]">
          {chips.map((chip, index) => (
            <Chip
              key={index}
              className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}
            >
              {chip.label} {chip.value}
            </Chip>
          ))}
        </Card.Container>
        <Chip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
          {mainChip.label} {mainChip.value}
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
