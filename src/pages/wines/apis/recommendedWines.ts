import { axiosInstance } from '@src/shared/apis/axios';

export type RecommendedWineUser = {
  id: number;
  nickname: string;
  image: string;
};

export type RecommendedWineReview = {
  user: RecommendedWineUser;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
};

export type RecommendedWine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: RecommendedWineReview | null;
  userId: number;
};

export type GetRecommendedWinesParams = {
  limit: number;
};

export async function getRecommendedWines(params: GetRecommendedWinesParams = { limit: 10 }) {
  const { data } = await axiosInstance.get<RecommendedWine[]>('/wines/recommended', { params });
  return data;
}
