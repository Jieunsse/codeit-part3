import clsx from 'clsx';
import { Recommended } from '../components/Recommended';

interface RecommendedItem {
  id: string;
  rating: number;
  title: string;
}

interface RecommandedContainerProps {
  items?: RecommendedItem[];
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
export function RecommandedContainer({ className, items }: RecommandedContainerProps) {
  return (
    <Recommended
      className={clsx(
        'flex w-full flex-col rounded-2xl bg-gray-100 px-[30px] py-[30px] pr-[0px]',
        className,
      )}
      title="이번 달 추천 와인"
      items={items || []}
    />
  );
}
