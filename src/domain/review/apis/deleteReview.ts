import { axiosInstance } from '@src/shared/apis/basic/axios';

export async function deleteReview(reviewId: number) {
  await axiosInstance.delete(`/reviews/${reviewId}`);
}
