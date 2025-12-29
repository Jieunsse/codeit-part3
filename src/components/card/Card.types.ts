/**
 * 카드 컴포넌트들의 공통 베이스 타입
 *
 * @property {string} [size] - 카드 크기 (small, medium, large). 지정하지 않으면 반응형으로 동작
 * @property {number} [rating] - 평점 (보통 1-5 사이)
 * @property {string} [text] - 본문 텍스트 또는 설명
 * @property {string} [title] - 제목
 */
export interface BaseCardProps {
  size?: 'small' | 'large' | 'medium';
  rating?: number;
  text?: string;
  title?: string;
  className?: string;
}
