import { Star } from './Star';

interface AverageScoreProps {
  value: number;
}

export function AverageScore({ value }: AverageScoreProps) {
  const filledStars = Math.floor(value);

  return (
    <div className="flex items-start gap-[12px]">
      <span className="text-[54px] leading-none font-extrabold text-[var(--color-gray-800)]">
        {value.toFixed(1)}
      </span>

      <div className="flex gap-[4px] pt-[8px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} active={i < filledStars} />
        ))}
      </div>
    </div>
  );
}
