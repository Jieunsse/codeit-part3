import { PageContainer } from '@src/app/layouts/PageContainer';
import { Card } from '@src/components/card/Card';
import type { Wine } from '@shared/types/Wine';
import { useEffect, useState } from 'react';
import { getWineList } from '@src/shared/apis/wine/getWineList';
import { RatingSummary } from '@src/components/ratingSummary/RatingSummary';
import { CardReview } from '@src/components/card/CardReview';
import { ReviewRegisterModal } from '@src/components/modal/modals/ReviewRegisterModal/ReviewRegisterModal';

export function WineDetailPage() {
  const [wine, setWine] = useState<Wine | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    async function fetchWine() {
      const data = await getWineList();
      setWine(data.list[0]);
    }

    fetchWine();
  }, []);

  if (!wine) {
    return <PageContainer>로딩 중...</PageContainer>;
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        {/* 상단 와인 정보 */}
        <section>
          <Card className="w-full">
            <Card.Container className="flex items-center gap-6 p-6">
              {/* 왼쪽 와인 이미지 */}
              <Card.Image
                src={wine.image}
                alt={wine.name}
                className="h-[120px] w-[48px] object-contain"
              />

              {/* 오른쪽 텍스트 영역 */}
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

        {/* 하단 콘텐츠 */}
        <section className="flex gap-8">
          {/* 리뷰 리스트 */}
          <main className="flex-1">
            <h3 className="text-[24px] font-bold text-gray-800">리뷰 목록</h3>

            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <CardReview
                  key={index}
                  username="와인러버"
                  createdAt="10시간 전"
                  text="Deep maroon color, tasting notes of blackberry, dark chocolate, plum. Super jammy and bold with some smoky after notes. Big flavor. Amazing value (would pay three times the price for it), well balanced flavor. Could drink all day everyday with or without food. I need more immediately."
                  chips={[
                    { title: '체리' },
                    { title: '오크' },
                    { title: '카라멜' },
                    { title: '시트러스' },
                    { title: '꽃' },
                  ]}
                  mainChip={{ label: '★', value: 5.0 }}
                  flavorValue={{
                    body: 80,
                    tannin: 35,
                    sweet: 60,
                    acid: 65,
                  }}
                />
              ))}
            </div>
          </main>

          {/* 별점 영역 */}
          <aside className="mt-[64px] w-[280px] shrink-0">
            <RatingSummary
              average={4.8}
              reviewCount={5446}
              distributions={[
                { score: 5, ratio: 0.78 },
                { score: 4, ratio: 0.64 },
                { score: 3, ratio: 0.12 },
                { score: 2, ratio: 0.04 },
                { score: 1, ratio: 0.0 },
              ]}
              onClickReview={() => setIsReviewModalOpen(true)}
            />
          </aside>
        </section>
      </div>

      {/* 리뷰 등록 모달 */}
      <ReviewRegisterModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        wineName={wine.name}
        wineImageUrl={wine.image}
        onSubmit={async () => {
          setIsReviewModalOpen(false);
        }}
      />
    </PageContainer>
  );
}
