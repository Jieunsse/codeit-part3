import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded-[12px] bg-[var(--color-primary-purple-100)] p-3 text-[14px] leading-[24px] font-[var(--font-weight-bold)] text-[var(--color-white)] md:rounded-[16px] md:text-[16px] md:leading-[26px] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
