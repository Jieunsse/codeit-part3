import { useState } from 'react';
import type { RatingFilterProps, RatingRange } from './types/rating.types';
import { RATING_ITEMS } from './data/rating.data';
import { RATING } from './constants/rating.constants';

const checkboxStyle = {
  width: RATING.CHECKBOX_SIZE,
  height: RATING.CHECKBOX_SIZE,
  borderRadius: RATING.CHECKBOX_RADIUS,
  border: '1px solid var(--color-gray-300)',
  backgroundColor: 'var(--color-gray-100)',
};

const checkedInnerStyle = {
  width: RATING.INNER_SIZE,
  height: RATING.INNER_SIZE,
  borderRadius: RATING.INNER_RADIUS,
  backgroundColor: 'var(--color-primary-purple-100)',
};

export function RatingFilter({ onSelect }: RatingFilterProps) {
  const [selected, setSelected] = useState<RatingRange>('all');

  const handleSelect = (key: RatingRange) => {
    setSelected(key);
    onSelect(key);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl leading-[32px] font-bold text-gray-800">RATING</h2>

      <ul className="space-y-3">
        {RATING_ITEMS.map(({ key, label }) => {
          const isChecked = selected === key;

          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => handleSelect(key)}
                className="flex items-center gap-3"
              >
                <span className="flex items-center justify-center" style={checkboxStyle}>
                  {isChecked && <span style={checkedInnerStyle} />}
                </span>

                <span
                  className="text-lg leading-[26px] font-medium"
                  style={{
                    color: isChecked ? 'var(--color-primary-purple-100)' : 'var(--color-gray-800)',
                  }}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
