import clsx from 'clsx';

interface StarRatingProps {
  className?: string;
  maxRating?: number;
  value: number;
}

export function StarRating({ className, maxRating = 5, value }: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => maxRating - i);

  return (
    <div className={clsx('flex flex-row-reverse justify-end', className)}>
      {stars.map((starValue) => {
        const isSelected = starValue <= value;

        return (
          <span
            key={starValue}
            className="transition-colors"
            style={{
              color: isSelected ? 'var(--color-primary-purple-100)' : 'var(--color-gray-300)',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
