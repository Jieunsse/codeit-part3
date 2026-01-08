import { axiosInstance } from '@src/shared/apis/basic/axios';

export async function toggleReviewLike(reviewId: number) {
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/like`);
  return data;
}
