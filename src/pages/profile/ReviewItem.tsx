import type { MyReview } from './myReview';
import star from '@shared/assets/images/star.svg';
import more from '@shared/assets/images/more.svg';

export default function ReviewItem({ item }: { item: MyReview }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-gray-300)] bg-[var(--color-white)] px-[19px] py-[15px]">
      <div className="flex items-center gap-[15px]">
        <div className="font-[var( --font-weight-bold)] flex gap-[2px] rounded-[12px] bg-[var(--color-primary-purple-10)] px-[10px] py-[4px] text-[14px] leading-6 text-[var(--color-primary-purple-100)]">
          <img src={star} />
          {item.rating}
        </div>
        <div className="flex-1 text-[14px] leading-6 font-[var(--font-weight-regular)] text-[var(--color-gray-500)]">
          {item.updatedAt}
        </div>
        <button>
          <img src={more} />
        </button>
      </div>
      <div></div>
      <div>{item.content}</div>
    </div>
  );
}
