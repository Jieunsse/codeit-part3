/**
 * 카드 컴포넌트들의 공통 베이스 타입
 *
 * @property {string} [className] - 추가 CSS 클래스
 * @property {number} [rating] - 평점 (보통 1-5 사이)
 * @property {string} [text] - 본문 텍스트 또는 설명
 * @property {string} [title] - 제목
 */
export interface BaseCardProps {
  rating?: number;
  text?: string;
  title?: string;
  className?: string;
}
