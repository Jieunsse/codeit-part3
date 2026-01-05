import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import wine2 from '@shared/assets/images/wine2.svg';
import clsx from 'clsx';
import { CardChip } from './CardChip';
import kebab from '@shared/assets/images/kebab.svg';

interface CardMylistProps extends BaseCardProps {
  price?: number;
  /** 케밥(팝업 메뉴) 버튼 클릭 핸들러 */
  onMenuClick?: () => void;
}

/**
 * 내 위시리스트의 와인을 표시하는 카드 컴포넌트
 *
 * @param {CardMylistProps} props - 컴포넌트 props
 * @param {string} [props.title='Title'] - 와인 제목
 * @param {string} [props.text='Detail'] - 와인 설명
 * @param {number} [props.price=10000] - 와인 가격
 *
 * @example
 * // 기본 사용
 * <CardMylist />
 *
 * @example
 * // 모든 props 사용
 * <CardMylist
 *   title="돔 페리뇽 2012"
 *   text="프랑스 샴페인"
 *   price={320000}
 * />
 */
export function CardMylist({
  text = 'Detail',
  price = 10000,
  title = 'Title',
  className,
  onMenuClick,
}: CardMylistProps) {
  // 모바일(small) → md(medium) → lg(large) 반응형 고정
  const cardSizeClass = clsx(
    'h-[164px] px-[20px] py-[16px] pb-[0px]',
    'md:min-h-[228px] md:pl-[60px] md:py-[20px] md:pb-[0px]',
    'lg:min-h-[228px] lg:pl-[60px] lg:py-[24px] lg:pb-[0px]',
  );

  const imageSizeClass = 'w-[53px] h-[185px] md:w-[90px] md:h-[270px] lg:w-[90px] lg:h-[270px]';
  const imagePositionSizeClass = 'w-[60px] md:w-[80px] lg:w-[80px]';
  const textClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const titleClass = 'text-[20px] md:text-[30px] lg:text-[30px]';
  const chipClass = 'text-[14px] md:text-[18px] lg:text-[18px]';
  const bodyClass = 'w-4/5 md:w-3/5';

  return (
    <Card className={clsx('flex w-full flex-row justify-between', cardSizeClass, className)}>
      <Card.Container className="relative flex w-full flex-row items-end gap-[28px] overflow-visible">
        <Card.Body className={clsx(imagePositionSizeClass, 'flex h-full shrink-0 items-end')}>
          <Card.Image
            src={wine2}
            alt="Wine"
            className={clsx(imageSizeClass, 'w-full object-contain')}
          />
        </Card.Body>

        <Card.Body
          className={clsx(bodyClass, 'flex h-full flex-col items-start justify-start gap-[10px]')}
        >
          <Card.Title
            className={titleClass}
            style={{ fontWeight: '600', color: 'var(--color-gray-800)' }}
          >
            {title}
          </Card.Title>
          <Card.Text className={clsx(textClass)} style={{ color: 'var(--color-gray-500)' }}>
            {text}
          </Card.Text>
          <CardChip className={clsx(chipClass)}>₩ {price?.toLocaleString()}</CardChip>
        </Card.Body>
      </Card.Container>
      <Card.Icon
        onClick={onMenuClick}
        className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
      >
        <Card.Image src={kebab} alt="kebab" className="h-[26px] w-[26px]" />
      </Card.Icon>
    </Card>
  );
}
