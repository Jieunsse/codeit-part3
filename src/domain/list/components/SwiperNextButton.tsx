import clsx from 'clsx';
import rightarrow from '@shared/assets/images/rightarrow.svg';

interface SwiperNextButtonProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Swiper 내부에 올려서 사용하는 Next(다음) 오버레이 버튼
 *
 * @param {SwiperNextButtonProps} props
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {function} [props.onClick] - 클릭 시 실행할 핸들러 (예: swiper.slideNext)
 *
 * @example
 * <SwiperNextButton onClick={() => swiperRef.current?.slideNext()} />
 */
export function SwiperNextButton({ className, onClick }: SwiperNextButtonProps) {
  return (
    <button
      type="button"
      aria-label="다음"
      className={clsx(
        'h-[48px] w-[48px] rounded-full border',
        'flex items-center justify-center',
        'transition-opacity hover:opacity-80',
        className,
      )}
      style={{
        backgroundColor: 'var(--color-white)',
        borderColor: 'var(--color-gray-300)',
        color: 'var(--color-gray-800)',
      }}
      onClick={onClick}
    >
      <img src={rightarrow} alt="arrow right" className="h-[24px] w-[24px] object-contain" />
    </button>
  );
}
