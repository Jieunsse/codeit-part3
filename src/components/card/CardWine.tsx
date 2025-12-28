import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import wine2 from '@shared/assets/images/wine2.svg';
import clsx from 'clsx';
import { Chip } from './CardChip';
import { StarRating } from '../star/StarRating';
import rightarrow from '@shared/assets/images/rightarrow.svg';

interface CardWineProps extends BaseCardProps {
  price?: number;
  review?: string;
  reviewNumber?: number;
}

export function CardWine({
  size,
  text = 'Detail',
  price = 10000,
  review = '최신 후기',
  rating = 4.8,
  reviewNumber = 47,
  title = 'Title',
}: CardWineProps) {
  // size에 따른 스타일 결정
  const cardSizeClass = clsx(
    size
      ? {
          small: 'w-[343px] h-[360px]',
          medium: 'w-[704px] h-[375px]',
          large: 'w-[800px] h-[375px]',
        }[size]
      : 'w-[343px] h-[360px]', // size 없으면 모바일 기본
    'md:w-[704px] md:h-[375px]',
    'lg:w-[800px] lg:h-[375px]',
  );

  const imagePositionSizeClass = clsx('w-[80px]', 'md:w-[80px]', 'lg:w-[80px]');

  const textClass = clsx(
    size
      ? {
          small: 'text-[14px]',
          medium: 'text-[16px]',
          large: 'text-[16px]',
        }[size]
      : 'text-[14px]',
    'md:text-[16px]',
    'lg:text-[16px]',
  );

  const titleClass = clsx(
    size
      ? {
          small: 'text-[20px]',
          medium: 'text-[30px]',
          large: 'text-[30px]',
        }[size]
      : 'text-[20px]',
    'md:text-[30px]',
    'lg:text-[30px]',
  );

  const chipClass = clsx(
    size
      ? {
          small: 'text-[14px]',
          medium: 'text-[18px]',
          large: 'text-[18px]',
        }[size]
      : 'text-[14px]',
    'md:text-[18px]',
    'lg:text-[18px]',
  );

  const bodyClass = 'w-4/5 md:w-3/5';
  const starTitleClass = 'text-[28px] md:text-[48px] lg:text-[48px]';

  return (
    <Card className={clsx('flex flex-col', cardSizeClass)}>
      <Card.Container className="relative flex h-2/3 flex-row items-end gap-[28px] overflow-visible px-[20px] py-[16px] pb-[0px]">
        <Card.Body className={clsx(imagePositionSizeClass, 'h-full')}>
          <Card.Image src={wine2} alt="Wine" className="h-full w-full object-contain" />
        </Card.Body>

        <Card.Body
          className={clsx(bodyClass, 'flex h-full flex-col items-start justify-between pb-[24px]')}
        >
          <Card.Container className="flex flex-col gap-[20px]">
            <Card.Title
              className={titleClass}
              style={{ fontWeight: '700', color: 'var(--color-gray-800)' }}
            >
              {title}
            </Card.Title>
            <Card.Text className={clsx(textClass)} style={{ color: 'var(--color-gray-500)' }}>
              {text}
            </Card.Text>
          </Card.Container>

          <Chip className={clsx(chipClass)}>₩ {price?.toLocaleString()}</Chip>

          {/* 모바일용: StarRating이 Card.Body 안에 */}
          <Card.Container className="flex w-full flex-row items-center justify-between md:hidden">
            <Card.Container className="flex flex-row items-center gap-[13px]">
              <Card.Title
                className={starTitleClass}
                style={{ fontWeight: '800', color: 'var(--color-gray-800)' }}
              >
                {rating}
              </Card.Title>
              <Card.Container>
                <StarRating value={rating} className="text-[14px]" />
                <Card.Text
                  className="text-[12px]"
                  style={{
                    color: 'var(--color-gray-500)',
                  }}
                >
                  {reviewNumber}개의 후기
                </Card.Text>
              </Card.Container>
            </Card.Container>

            <Card.Icon>
              <img src={rightarrow} alt="rightarrow" style={{ cursor: 'pointer' }} />
            </Card.Icon>
          </Card.Container>
        </Card.Body>

        {/* 태블릿/데스크톱용: StarRating이 별도 섹션 */}
        <Card.Container className="hidden h-full flex-col justify-between pb-[24px] md:flex">
          <Card.Container className="flex flex-col gap-[4px]">
            <Card.Title
              className={starTitleClass}
              style={{ fontWeight: '800', color: 'var(--color-gray-800)' }}
            >
              {rating}
            </Card.Title>

            <StarRating value={rating} className="text-[20px]" />
            <Card.Text
              className="text-[14px]"
              style={{
                color: 'var(--color-gray-500)',
              }}
            >
              {reviewNumber}개의 후기
            </Card.Text>
          </Card.Container>

          <Card.Icon className="self-end">
            <img src={rightarrow} alt="rightarrow" style={{ cursor: 'pointer' }} />
          </Card.Icon>
        </Card.Container>
      </Card.Container>

      <Card.Footer className="flex flex-col border-t border-gray-200 px-[28px] py-[16px]">
        <Card.Title
          className={textClass}
          style={{ fontWeight: '700', color: 'var(--color-gray-800)' }}
        >
          최신 후기
        </Card.Title>
        <Card.Text className={clsx(textClass)} style={{ color: 'var(--color-gray-500)' }}>
          {review}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
}
