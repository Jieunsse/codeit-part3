import type { InputHTMLAttributes } from 'react';
import searchIcon from '@shared/assets/images/search.svg';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  iconButtonType?: 'button' | 'submit';
  onIconClick?: () => void;
}

export function Search({
  className,
  placeholder = '검색하세요.',
  iconButtonType = 'button',
  onIconClick,
  ...rest
}: SearchProps) {
  const parentClassName = `flex gap-[10px] md:gap-[15px] items-center rounded-full border border-[var(--color-gray-300)] bg-[var(--color-white)] px-[15px] md:px-5 py-[6px] md:py-[10px] ${className}`;
  const imgClassName = `w-5 h-5`;
  const inputClassName = `flex-1 text-[14px] md:text-[16px] leading-[26px] border-none outline-none font-[var(--font-weight-medium)] text-[var(--color-gray-800)] placeholder-[var(--color-gray-500)]`;
  return (
    <div className={parentClassName}>
      <button type={iconButtonType} onClick={onIconClick} className="shrink-0">
        <img className={imgClassName} src={searchIcon} alt="search" />
      </button>
      <input className={inputClassName} placeholder={placeholder} {...rest} />
    </div>
  );
}
