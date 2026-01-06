import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageContainer } from '@src/app/layouts/PageContainer';
import { Card } from '@src/components/card/Card';
import { RatingSummary } from '@src/components/ratingSummary/RatingSummary';
import { CardReview } from '@src/components/card/CardReview';
import { ReviewRegisterModal } from '@src/components/modal/modals/ReviewRegisterModal/ReviewRegisterModal';

import { useWineDetail } from './hooks/useWineDetail';
import { useSubmitReview } from '@src/domain/review/hooks/useSubmitReview';
import { mapReviewToCardModel } from '@src/domain/review/mapper/mapReviewToCardModel';

export function WineDetailPage() {
  const { wineId } = useParams<{ wineId: string }>();

  const { wine, reviews, setReviews, error } = useWineDetail(wineId);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const submitReview = useSubmitReview(wine?.id ?? 0);

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
          <Card className="w-full">
            <Card.Container className="flex items-center gap-6 p-6">
              <Card.Image
                src={wine.image}
                alt={wine.name}
                className="h-[120px] w-[48px] object-contain"
              />
              <Card.Body className="flex flex-col gap-2">
                <Card.Title className="text-lg font-semibold text-gray-900">{wine.name}</Card.Title>
                <Card.Text className="text-sm text-gray-400">{wine.region}</Card.Text>
                <Card.Text className="mt-2 inline-block w-fit rounded-lg bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600">
                  ₩{wine.price.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card.Container>
          </Card>
        </section>

        <section className="flex gap-8">
          <main className="flex-1">
            <h3 className="text-[24px] font-bold text-gray-800">리뷰 목록</h3>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <CardReview key={review.id} {...mapReviewToCardModel(review)} />
              ))}
            </div>
          </main>

          <aside className="mt-[64px] w-[280px] shrink-0">
            <RatingSummary
              average={wine.avgRating}
              reviewCount={wine.reviewCount}
              distributions={[]}
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
