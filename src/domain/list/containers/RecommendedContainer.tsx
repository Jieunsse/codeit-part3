import clsx from 'clsx';
import { Recommended } from '../components/Recommended';

interface RecommendedContainerProps {
  className?: string;
}

/**
 * Recommended 컨테이너
 * - 데이터 준비(임시 더미) + UI 조립을 담당
 * - 실제 API 연동 시 여기서 fetch/react-query를 붙이고, `Recommended`는 그대로 UI만 렌더
 *
 * @example
 * <RecommendedContainer />
 */
export function RecommendedContainer({ className }: RecommendedContainerProps) {
  const items = [
    { id: 'monthly-1', rating: 4.8, title: '이달의 추천 와인' },
    { id: 'monthly-2', rating: 4.7, title: 'TOP 셀러' },
    { id: 'monthly-3', rating: 4.9, title: '신상 와인' },
    { id: 'monthly-4', rating: 4.6, title: '가성비 추천' },
  ];

  return (
    <Recommended
      className={clsx(
        'flex w-full flex-col rounded-2xl bg-gray-100 px-[30px] py-[30px] pr-[0px]',
        className,
      )}
      title="이번 달 추천 와인"
      items={items}
    />
  );
}
