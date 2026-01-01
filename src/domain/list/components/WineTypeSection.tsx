import { Chips } from '@src/components/chips/Chips';
import clsx from 'clsx';

type WineType = 'Red' | 'White' | 'Sparkling';

type WineTypesSectionProps = {
  /** 현재 선택된 타입(단일 선택 UX: 클릭 시 `[type]`로 치환) */
  value: WineType[];
  onChange: (next: WineType[]) => void;
  className?: string;
  title?: string;
  options?: readonly WineType[];
};

export function WineTypesSection({
  value,
  onChange,
  className,
  title = 'WINE TYPES',
  options = ['Red', 'White', 'Sparkling'],
}: WineTypesSectionProps) {
  return (
    <section className={clsx('flex flex-col gap-[12px]', className)}>
      <div className="text-[20px] font-bold text-gray-800">{title}</div>

      <div
        className={clsx(
          'flex flex-row items-center gap-[8px]',
          // Chips(button) 자체를 부모에서 스타일링 (Chips 컴포넌트 수정 없이)
          '[&>button]:w-full',
          '[&>button]:border-[1px] [&>button]:border-[var(--color-gray-300)]',
          '[&>button]:text-[14px] md:[&>button]:text-[16px] lg:[&>button]:text-[16px]',
        )}
      >
        {options.map((t) => (
          <Chips key={t} title={t} selected={value.includes(t)} onClick={() => onChange([t])} />
        ))}
      </div>
    </section>
  );
}
