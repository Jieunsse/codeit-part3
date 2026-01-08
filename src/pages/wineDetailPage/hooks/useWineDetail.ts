import { useEffect, useState } from 'react';

import type { Wine } from '@shared/types/Wine';
import type { ReviewResponse } from '@src/domain/review/types/ReviewResponse';

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
          reviewIds.map((id) =>
            axiosInstance
              .get<ReviewResponse>(`/reviews/${id}`)
              .then((res) => res.data)
              .catch((err) => {
                if (err.response?.status === 404) {
                  return null;
                }
                throw err;
              }),
          ),
        );

        const fetchedReviews = results
          .filter(
            (result): result is PromiseFulfilledResult<ReviewResponse | null> =>
              result.status === 'fulfilled',
          )
          .map((result) => result.value)
          .filter(
            (review): review is ReviewResponse => review !== null && review.wineId === wineData.id,
          );

        setReviews(fetchedReviews);
      } catch {
        setError(true);
      }
    }

    load();
  }, [wineId]);

  return { wine, reviews, setReviews, error };
}
