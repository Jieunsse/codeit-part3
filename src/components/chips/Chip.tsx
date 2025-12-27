import clsx from 'clsx';

interface ChipProps {
  className?: string;
  children?: React.ReactNode;
}

export function Chip({ className, children }: ChipProps) {
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
