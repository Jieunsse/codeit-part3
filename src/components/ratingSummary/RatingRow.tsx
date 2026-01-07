interface RatingRowProps {
  score: number;
  ratio: number;
}

export function RatingRow({ score, ratio }: RatingRowProps) {
  return (
    <div className="flex items-center gap-[12px]">
      <span className="w-[24px] text-right text-[16px] font-medium text-[var(--color-gray-500)]">
        {score}점
      </span>

      <div className="relative h-[6px] w-[241px] rounded-full bg-[var(--color-gray-100)]">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-[var(--color-primary-purple-100)]"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
