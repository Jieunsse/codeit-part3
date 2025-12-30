import clsx from 'clsx';

interface CardChipProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * 카드 내부에서 사용되는 칩 컴포넌트
 *
 * @param {ChipProps} props - 컴포넌트 props
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {React.ReactNode} [props.children] - 칩 내부 콘텐츠
 *
 * @example
 * // 기본 사용
 * <Chip>₩ 10,000</Chip>
 *
 * @example
 * // className과 함께 사용
 * <Chip className="text-lg">★ 4.8</Chip>
 */
export function CardChip({ className, children }: CardChipProps) {
  return (
    <div
      className={clsx('rounded-[12px] px-[15px] py-[5px]', className)}
      style={{
        backgroundColor: 'var(--color-primary-purple-10)',
        color: 'var(--color-primary-purple-100)',
        fontWeight: 'var(--font-weight-medium)',
      }}
    >
      {children}
    </div>
  );
}
