import type { PostReviewRequest } from '@src/domain/review/types/PostReviewRequest';
import type { ReviewResponse } from '@src/domain/review/types/ReviewResponse';
import { axiosInstance } from '@src/shared/apis/basic/axios';

export async function postReview(payload: PostReviewRequest): Promise<ReviewResponse> {
  const response = await axiosInstance.post('/reviews', payload);
  return response.data;
}
