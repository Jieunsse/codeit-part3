import type { BaseCardProps } from './Card.types';
import { Card } from './Card';
import wine2 from '@shared/assets/images/wine2.svg';
import clsx from 'clsx';
import { CardChip } from './CardChip';

interface CardDetailProps extends BaseCardProps {
  price?: number;
}

/**
 * 와인 상세 정보를 간단하게 표시하는 카드 컴포넌트
 *
 * @param {CardDetailProps} props - 컴포넌트 props
 * @param {string} [props.title='Title'] - 와인 제목
 * @param {string} [props.text='Detail'] - 와인 설명
 * @param {number} [props.price=10000] - 와인 가격
 *
 * @example
 * // 기본 사용
 * <CardDetail />
 *
 * @example
 * // 모든 props 사용
 * <CardDetail
 *   title="샤또 라피트 로칠드"
 *   text="Pauillac, Bordeaux, France"
 *   price={850000}
 * />
 */
export function CardDetail({ text = 'Detail', price = 10000, title = 'Title' }: CardDetailProps) {
  // 너비는 유동(w-full)으로 두되, "이미지가 카드 위로 뚫고 나오는" 효과를 위해
  // 카드 높이는 breakpoint별로 최소 높이를 잡아준다(카드 높이 < 이미지 높이).
  const cardSizeClass = clsx(
    'h-[164px] px-[20px] py-[16px] pb-[0px]',
    'md:min-h-[228px] md:pl-[60px] md:py-[20px] md:pb-[0px]',
    'lg:min-h-[228px] lg:pl-[80px] lg:py-[24px] lg:pb-[0px]',
  );

  const imageSizeClass = 'w-[60px] h-[185px] md:w-[90px] md:h-[270px] lg:w-[90px] lg:h-[200px]';

  const imagePositionSizeClass = 'w-[60px] md:w-[80px] lg:w-[80px]';
  const textClass = 'text-[14px] md:text-[16px] lg:text-[16px]';
  const titleClass = 'text-[20px] md:text-[30px] lg:text-[30px]';
  const chipClass = 'text-[14px] md:text-[18px] lg:text-[18px]';
  const imageCoverClass = 'object-contain md:object-cover lg:object-contain';
  const bodyClass = 'w-4/5 md:w-3/5';

  return (
    <Card className={clsx('flex w-full flex-row overflow-visible', cardSizeClass)}>
      <Card.Container className="flex w-full flex-row items-end gap-[28px] overflow-visible">
        <Card.Body className={clsx(imagePositionSizeClass, 'flex h-full shrink-0 items-end')}>
          <Card.Image
            src={wine2}
            alt="Wine"
            className={clsx(imageCoverClass, imageSizeClass, 'w-full')}
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
          <CardChip className={clsx(chipClass)}>₩ {price?.toLocaleString()}</CardChip>
        </Card.Body>
      </Card.Container>
    </Card>
  );
}
