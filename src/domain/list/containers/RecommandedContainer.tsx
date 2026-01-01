import clsx from 'clsx';
import { Recommanded } from '../components/Recommanded';

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
 *
 * Recommanded 컨테이너
 *
 * @example
 * <RecommandedContainer />
 */
export function RecommandedContainer({ className, items }: RecommandedContainerProps) {
  return (
    <Recommanded
      className={clsx(
        'flex w-full flex-col rounded-2xl bg-gray-100 px-[30px] py-[30px] pr-[0px]',
        className,
      )}
      title="이번 달 추천 와인"
      items={items || []}
    />
  );
}
