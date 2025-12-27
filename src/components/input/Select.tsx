import { useEffect, useRef, useState } from 'react';
import dropdownSvg from '@shared/assets/images/dropdown.svg';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  title: string;
  options: SelectOption[];
  value?: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Select({
  title,
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className = '',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buttonClassName = `flex w-full items-center justify-between rounded-xl md:rounded-2xl border border-[var(--color-gray-300)] bg-[var(--color-white)] px-5 py-[7px] md:py-[10px] leading-[26px] font-[var(--font-weight-medium)] text-[var(--color-gray-800)] transition outline-none`;

  const listClassName =
    'absolute z-20 mt-1.5 flex w-full flex-col gap-[10px] md:gap-3 rounded-2xl border border-[var(--color-gray-300)] bg-[var(--color-white)] p-[5px] md:p-1.5';

  const itemClassName = `cursor-pointer px-4 py-[6px] md:py-2 leading-relaxed font-[var(--font-weight-medium)] transition`;

  return (
    <div
      ref={ref}
      className={`relative text-[14px] text-[var(--color-gray-800)] md:text-[16px] ${className}`}
    >
      {/* Title */}
      <div
        className={`mb-[10px] leading-normal font-[var(--font-weight-medium)] md:leading-relaxed`}
      >
        {title}
      </div>

      {/* Trigger */}
      <button type="button" onClick={() => setOpen(!open)} className={buttonClassName}>
        <span className={selected ? '' : 'text-[var(--color-gray-500)]'}>
          {selected?.label ?? placeholder}
        </span>
        <img
          className={`h-6 w-6 transition-transform ${open ? 'rotate-180' : ''}`}
          src={dropdownSvg}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul role="listbox" className={listClassName}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`${itemClassName} ${
                  isSelected
                    ? 'rounded-[10px] bg-[var(--color-primary-purple-10)] text-[var(--color-primary-purple-100)]'
                    : 'text-[var(--color-gray-800)]'
                } `}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
