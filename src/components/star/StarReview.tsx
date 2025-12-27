import { useState } from 'react';
import clsx from 'clsx';

interface StarReviewProps {
  className?: string;
  maxRating?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  name?: string;
}

export function StarReview({
  className,
  maxRating = 5,
  defaultValue = 0,
  onChange,
  name = 'score',
}: StarReviewProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(defaultValue);

  const handleChange = (rating: number) => {
    setSelectedRating(rating);
    onChange?.(rating);
  };

  const stars = Array.from({ length: maxRating }, (_, i) => maxRating - i);

  return (
    <div className={clsx('flex flex-row-reverse justify-end text-xl', className)}>
      <label htmlFor={name} className="sr-only">
        별점
      </label>
      {stars.map((starValue) => {
        const isSelected = starValue <= selectedRating;
        const isHovered = starValue <= hoveredRating;

        return (
          <div key={starValue} className="relative">
            <input
              type="radio"
              className="peer hidden"
              id={`${name}-${starValue}`}
              value={starValue}
              name={name}
              checked={starValue === selectedRating}
              onChange={() => handleChange(starValue)}
            />
            <label
              htmlFor={`${name}-${starValue}`}
              className="cursor-pointer transition-colors"
              style={{
                color:
                  isSelected || isHovered
                    ? 'var(--color-primary-purple-100)'
                    : 'var(--color-gray-300)',
              }}
              onMouseEnter={() => setHoveredRating(starValue)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              ★
            </label>
          </div>
        );
      })}
    </div>
  );
}
