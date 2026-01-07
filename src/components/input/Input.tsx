import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  className?: string;
  placeholder?: string;
}

export function Input({ title, className, placeholder = '입력하세요.', ...rest }: InputProps) {
  const parentClassName = `text-[14px] md:text-[16px] text-[var(--color-gray-800)] ${className}`;
  const titleClassName = `mb-[10px] lg:leading-[26px] leading-[24px] font-[var(--font-weight-medium)]`;
  const inputClassName = `flex w-full items-center justify-between rounded-xl md:rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-5 py-[7px] md:py-[10px] leading-[26px] font-[var(--font-weight-medium)] text-[var(--color-gray-800)] transition outline-none placeholder-[var(--color-gray-500)]`;
  return (
    <div className={parentClassName}>
      <div className={titleClassName}>{title}</div>
      <input className={inputClassName} placeholder={placeholder} {...rest} />
    </div>
  );
}
