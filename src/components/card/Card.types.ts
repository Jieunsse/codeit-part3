// 카드 컴포넌트들의 공통 베이스 타입
export interface BaseCardProps {
  size?: 'small' | 'large' | 'medium';
  rating?: number;
  text?: string;
  title?: string;
}
