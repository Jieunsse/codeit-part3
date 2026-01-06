interface ReviewCountProps {
  count: number;
}

export function ReviewCount({ count }: ReviewCountProps) {
  return (
    <span className="mt-[6px] text-[14px] text-[var(--color-gray-500)]">
      {count.toLocaleString()}개의 후기
    </span>
  );
}
