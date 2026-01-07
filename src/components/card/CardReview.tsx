import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import clsx from 'clsx';
import { ProfileImg } from '../profileImg/ProfileImg';
import profileimg from '@shared/assets/images/profile.svg';
import kebab from '@shared/assets/images/kebab.svg';
import heart from '@shared/assets/images/heart.svg';
import updown from '@shared/assets/images/updown.svg';
import { useEffect, useRef, useState } from 'react';
import { FlavorSliderReadOnly } from './FlavorSliderReadOnly';
import { CardChip } from './CardChip';
import { Chips } from '../chips/Chips';
import { ReviewDropdown } from '../dropdown/ReviewDropdown';

interface CardChipData {
  title: string;
}

interface MainChipData {
  label: string;
  value: number | string;
}

interface CardReviewProps extends BaseCardProps {
  username?: string;
  createdAt?: string;
  chips?: CardChipData[];
  mainChip?: MainChipData;
  flavorValue: {
    body: number;
    tannin: number;
    sweet: number;
    acid: number;
  };
  reviewId: number;
  isLiked?: boolean;
  onToggleLike?: (reviewId: number) => void;
  onDelete?: (reviewId: number) => void;
}

export function CardReview({
  username = '와인 러버',
  createdAt = '2025-01-01',
  text = 'Detail',
  chips = [{ title: '시트러스' }, { title: '맛' }, { title: '여운' }],
  flavorValue = { body: 50, tannin: 55, sweet: 20, acid: 65 },
  mainChip = { label: '★', value: 4.8 },
  reviewId,
  isLiked,
  onToggleLike,
  onDelete,
}: CardReviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const cardSizeClass = clsx(
    'w-[343px] px-[20px] py-[16px] gap-[16px]',
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
    <Card className={clsx('relative flex flex-col', cardSizeClass)}>
      <Card.Container className="flex items-center justify-between">
        <Card.Container className="flex items-center gap-[12px]">
          <ProfileImg src={profileimg} alt="profile" size={50} />
          <Card.Container>
            <Card.Title className={clsx(titleClass, 'font-semibold text-gray-800')}>
              {username}
            </Card.Title>
            <Card.Text className={clsx(timetextClass, 'text-gray-500')}>{createdAt}</Card.Text>
          </Card.Container>
        </Card.Container>

        <Card.Container className="flex items-center gap-[24px]">
          <Card.Icon
            className={clsx(iconSizeClass, 'cursor-pointer hover:opacity-80')}
            onClick={() => onToggleLike?.(reviewId)}
          >
            <img src={heart} alt="heart" className={clsx(isLiked ? 'opacity-100' : 'opacity-40')} />
          </Card.Icon>

          <Card.Icon className={clsx(iconSizeClass)}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex h-full w-full items-center justify-center hover:opacity-80"
            >
              <img src={kebab} alt="menu" className="h-full w-full object-contain" />
            </button>
          </Card.Icon>
        </Card.Container>
      </Card.Container>

      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute top-[64px] right-[20px] z-50">
          <ReviewDropdown
            onDelete={() => {
              setIsDropdownOpen(false);
              onDelete?.(reviewId);
            }}
          />
        </div>
      )}

      <Card.Container className="flex items-center justify-between">
        <Card.Container
          className={clsx(
            'flex items-center gap-[8px]',
            '[&>button]:w-full',
            '[&>button]:border',
            '[&>button]:border-gray-300',
            '[&>button]:text-gray-800',
            '[&>button]:text-[14px] md:[&>button]:text-[16px]',
          )}
        >
          {chips.map((chip, index) => (
            <Chips key={index} title={chip.title} />
          ))}
        </Card.Container>

        <CardChip className={clsx(chipClass, 'flex h-[42px] w-[80px] items-center justify-center')}>
          {mainChip.label} {mainChip.value}
        </CardChip>
      </Card.Container>

      {isExpanded && (
        <>
          <Card.Container>
            <Card.Text className={clsx(textClass, 'text-gray-800')}>{text}</Card.Text>
          </Card.Container>
          <FlavorSliderReadOnly value={flavorValue} />
        </>
      )}

      <Card.Icon
        className="h-[30px] w-[30px] cursor-pointer self-center transition-transform duration-300 hover:opacity-80"
        style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={updown} alt="toggle" className="h-full w-full object-contain" />
      </Card.Icon>
    </Card>
  );
}
