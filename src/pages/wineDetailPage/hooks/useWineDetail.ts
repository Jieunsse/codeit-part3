import { useEffect, useState } from 'react';

import type { Wine } from '@shared/types/Wine';
import type { ReviewResponse } from '@src/domain/review/types/ReviewResponse';
import type { AxiosResponse } from 'axios';

import { getWineDetail } from '@src/shared/apis/wine/getWineDetail';
import { axiosInstance } from '@src/shared/apis/basic/axios';
import { loadReviewIds } from '@src/domain/review/utils/reviewStorage';

export function useWineDetail(wineId?: string) {
  const [wine, setWine] = useState<Wine | null>(null);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!wineId) return;

    async function load() {
      try {
        const wineData = await getWineDetail(Number(wineId));
        setWine(wineData);

        const reviewIds = loadReviewIds(wineData.id);

        const results = await Promise.allSettled(
          reviewIds.map((id) => axiosInstance.get<ReviewResponse>(`/reviews/${id}`)),
        );

        const fulfilledResponses = results.filter(
          (result): result is PromiseFulfilledResult<AxiosResponse<ReviewResponse>> =>
            result.status === 'fulfilled',
        );

        const fetchedReviews = fulfilledResponses
          .map((result) => result.value.data)
          .filter((review) => review.wineId === wineData.id);

        setReviews(fetchedReviews);
      } catch {
        setError(true);
      }
    }

    load();
  }, [wineId]);

  return { wine, reviews, setReviews, error };
}
