import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';

import clsx from 'clsx';
import { CardMonthly } from '@src/components/card/CardMonthly';
import { useRef } from 'react';
import { SwiperNextButton } from './SwiperNextButton';

export interface RecommendedItem {
  id: string;
  rating: number;
  title: string;
}

interface RecommandedProps {
  className?: string;
  title: string;
  items: RecommendedItem[];
}

/**
 * 추천(이달의) 카드 목록을 가로 스와이프로 보여주는 컴포넌트
 *
 * - Swiper 기반 가로 스크롤/스와이프 UI
 * - 각 아이템은 `CardMonthly`로 렌더링
 *
 * @param {RecommandedProps} props
 * @param {string} [props.className] - wrapper 추가 클래스
 * @param {string} props.title - 섹션 타이틀
 * @param {RecommendedItem[]} props.items - 추천 카드 목록
 *
 * @example
 * // 데이터 주입
 * <Recommanded
 *   title="이번 달 추천 와인"
 *   items={[
 *     { id: '1', rating: 4.8, title: '이달의 추천 와인' },
 *     { id: '2', rating: 4.9, title: '에디터 픽' },
 *   ]}
 * />
 */
export function Recommanded({ className, title, items }: RecommandedProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section className={clsx(className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-[20px]" style={{ fontWeight: '700', color: 'var(--color-gray-800)' }}>
          {title}
        </div>
      </div>

      <div className="relative w-full">
        <Swiper
          modules={[FreeMode]}
          freeMode
          grabCursor
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="!w-auto">
              <CardMonthly rating={item.rating} title={item.title} className="border-none" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper 내부 오버레이 버튼 */}
        <SwiperNextButton
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </section>
  );
}
