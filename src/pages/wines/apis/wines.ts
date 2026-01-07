import { axiosInstance } from '@src/shared/apis/basic/axios';
import { uploadImage } from './images';

export type WineUser = {
  id: number;
  nickname: string;
  image: string;
};

export type WineReview = {
  user: WineUser;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
};

export type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: WineReview | null;
  userId: number;
};

export type CreateWineRequest = {
  name: string;
  region: string;
  price: number;
  type: string;
  photoFile?: File | null;
  imageUrl?: string;
};

export type GetWinesParams = {
  limit: number;
  cursor?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
};

export type GetWinesResponse =
  | { list: Wine[]; nextCursor?: number | null }
  | { wines: Wine[]; nextCursor?: number | null }
  | { items: Wine[]; nextCursor?: number | null }
  | Wine[];

export async function getWines(params: GetWinesParams) {
  const { data } = await axiosInstance.get<GetWinesResponse>('/wines', { params });
  return data;
}

export async function createWine(body: CreateWineRequest) {
  const { name, region, price, type, photoFile, imageUrl } = body;

  const resolvedImageUrl = imageUrl ?? (photoFile ? (await uploadImage(photoFile)).url : undefined);

  // 스펙: image는 URL(string)
  const payload = { name, region, price, type, image: resolvedImageUrl };
  const { data } = await axiosInstance.post<Wine>('/wines', payload);
  return data;
}
