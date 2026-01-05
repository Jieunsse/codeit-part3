import Button from '../button/Button';
import { AverageScore } from './AverageScore';
import { RatingDistributionList } from './RatingDistribution';
import { ReviewCount } from './ReviewCount';
import type { RatingSummaryProps } from './type/types';

interface RatingSummaryWithActionProps extends RatingSummaryProps {
  onClickReview: () => void;
}

export function RatingSummary({
  average,
  reviewCount,
  distributions,
  onClickReview,
}: RatingSummaryWithActionProps) {
  return (
    <section className="w-fit">
      <AverageScore value={average} />
      <ReviewCount count={reviewCount} />
      <RatingDistributionList data={distributions} />

      <Button className="mt-[24px] w-fit cursor-pointer px-[20px]" onClick={onClickReview}>
        리뷰 남기기
      </Button>
    </section>
  );
}
