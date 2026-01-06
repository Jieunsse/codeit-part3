export type ReviewAroma = 'CHERRY' | 'OAK' | 'CARAMEL' | 'CITRUS' | 'FLOWER' | string;

export interface ReviewUserResponse {
  id: number;
  nickname: string;
  image: string;
}

export interface ReviewResponse {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: ReviewAroma[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUserResponse;
  isLiked: boolean | object;
  wineId: number;
  teamId: string;
}
