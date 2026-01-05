import { RatingRow } from './RatingRow';
import type { RatingDistribution } from './type/types';

interface Props {
  data: RatingDistribution[];
}

export function RatingDistributionList({ data }: Props) {
  return (
    <div className="mt-[16px] flex flex-col gap-[10px]">
      {data.map((item) => (
        <RatingRow key={item.score} score={item.score} ratio={item.ratio} />
      ))}
    </div>
  );
}
