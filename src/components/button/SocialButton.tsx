import type { ButtonHTMLAttributes, ReactNode } from 'react';
import googleIcon from '@shared/assets/images/google.svg';
import kakaoIcon from '@shared/assets/images/kakao.svg';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isGoogle: boolean;
  children?: ReactNode;
}

export default function SocialButton({
  className,
  isGoogle,
  children,
  ...rest
}: SocialButtonProps) {
  return (
    <button
      className={`rounded-[12px] border border-[var(--color-gray-300)] bg-[var(--color-white)] p-[11px] text-[14px] leading-[24px] font-[var(--font-weight-medium)] text-[var(--color-gray-800)] md:rounded-[16px] md:p-[12px] md:text-[16px] md:leading-[26px] ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-[10px] md:gap-[12px]">
        <img className="h-5 w-5 md:h-6 md:w-6" src={isGoogle ? googleIcon : kakaoIcon} />
        {children}
      </div>
    </button>
  );
}
