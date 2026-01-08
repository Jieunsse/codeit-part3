import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PageContainer } from '@src/app/layouts/PageContainer';

import { RatingSummary } from '@src/components/ratingSummary/RatingSummary';
import { CardReview } from '@src/components/card/CardReview';
import { ReviewRegisterModal } from '@src/components/modal/modals/ReviewRegisterModal/ReviewRegisterModal';

import { useWineDetail } from './hooks/useWineDetail';
import { useSubmitReview } from '@src/domain/review/hooks/useSubmitReview';
import { useReviewActions } from '@src/domain/review/hooks/useReviewActions';

import { mapReviewToCardModel } from '@src/domain/review/mapper/mapReviewToCardModel';
import { calculateRatingDistributions } from '@src/domain/review/utils/calculateRatingDistributions';
import { CardDetail } from '@src/components/card/CardDetail';

export function WineDetailPage() {
  const { wineId } = useParams<{ wineId: string }>();

  const { wine, reviews, setReviews, error } = useWineDetail(wineId);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const submitReview = useSubmitReview(wine?.id ?? 0);
  const { handleToggleLike, handleDeleteReview } = useReviewActions(setReviews);

  const distributions = useMemo(() => calculateRatingDistributions(reviews), [reviews]);

  if (error) {
    return <PageContainer>존재하지 않는 와인입니다.</PageContainer>;
  }

  if (!wine) {
    return <PageContainer>로딩 중...</PageContainer>;
  }

  const handleSubmitReview = async (value: Parameters<typeof submitReview>[0]) => {
    try {
      const review = await submitReview(value);
      setReviews((prev) => [review, ...prev]);
      setIsReviewModalOpen(false);
    } catch {
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <section>
          <CardDetail
            imageUrl={wine.image}
            title={wine.name}
            text={wine.region}
            price={wine.price}
          />
        </section>

        <section className="flex gap-8">
          <main className="flex-1">
            <h3 className="text-[24px] font-bold text-gray-800">리뷰 목록</h3>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <CardReview
                  key={review.id}
                  {...mapReviewToCardModel(review)}
                  onToggleLike={handleToggleLike}
                  onDelete={handleDeleteReview}
                />
              ))}
            </div>
          </main>

          <aside className="mt-[64px] w-[280px] shrink-0">
            <RatingSummary
              average={wine.avgRating}
              reviewCount={wine.reviewCount}
              distributions={distributions}
              onClickReview={() => setIsReviewModalOpen(true)}
            />
          </aside>
        </section>
      </div>

      <ReviewRegisterModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        wineName={wine.name}
        wineImageUrl={wine.image}
        onSubmit={handleSubmitReview}
      />
    </PageContainer>
  );
}
