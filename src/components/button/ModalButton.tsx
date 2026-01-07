import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  cancel?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function ModalButton({
  cancel = false,
  className,
  children,
  ...rest
}: ModalButtonProps) {
  const buttonClassName = cancel
    ? `rounded-[12px] text-[var(--color-gray-500)] bg-[var(--color-white)] border border-[var(--color-gray-300)] px-[16px] md:px-[18px] py-[6px] text-[14px] leading-[24px] font-[var(--font-weight-medium)] md:text-[16px] md:leading-[26px] ${className}`
    : `rounded-[12px] text-[var(--color-white)] bg-[var(--color-primary-purple-100)] border border-[var(--color-primary-purple-100)] px-[16px] md:px-[18px] py-[6px] text-[14px] leading-[24px] font-[var(--font-weight-bold)] md:text-[16px] md:leading-[26px] ${className}`;
  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}
