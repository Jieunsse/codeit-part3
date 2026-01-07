import type { ReviewUser } from './reviewUser';

export interface Review {
  user: ReviewUser;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
}

export function convertReviewTime(timeStr: string) {
  const dt = new Date(timeStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dt.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes == 0) return '방금 전';
  const hours = Math.floor(minutes / 60);
  if (hours == 0) return `${minutes}분 전`;
  const days = Math.floor(hours / 24);
  if (days == 0) return `${hours}시간 전`;
  if (days < 4) return `${days}일 전`;
  if (dt.getFullYear() == now.getFullYear()) return `${dt.getMonth() + 1}월 ${dt.getDate()}일`;
  return `${dt.getFullYear()}년 ${dt.getMonth() + 1}월 ${dt.getDate()}일`;
}
