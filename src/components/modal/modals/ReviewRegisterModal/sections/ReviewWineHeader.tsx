import wineIcon from '../../../img/wineIcon.svg';
import { StarReview as StarReviewComponent } from '../../../../star/StarReview';

type Props = {
  wineName: string;
  wineImageUrl?: string;
  rating: number;
  onChangeRating: (v: number) => void;
};

export function ReviewWineHeader({ wineName, wineImageUrl, rating, onChangeRating }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-[68px] w-[68px] overflow-hidden rounded-xl bg-gray-100">
        {wineImageUrl ? (
          <img src={wineImageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <img src={wineIcon} alt="wineIcon" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="pt-px pb-2 text-[18px] leading-[26px] font-semibold text-gray-800">
          {wineName}
        </div>
        <StarReviewComponent defaultValue={rating} onChange={onChangeRating} />
      </div>
    </div>
  );
}
