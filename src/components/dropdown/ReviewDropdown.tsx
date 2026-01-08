import { DropdownBase } from './base/DropdownBase';
import { REVIEW_ITEMS } from './review/data/review.data';

interface ReviewDropdownProps {
  onDelete: () => void;
}

export function ReviewDropdown({ onDelete }: ReviewDropdownProps) {
  return (
    <DropdownBase
      items={REVIEW_ITEMS}
      width={120}
      onItemClick={(item) => {
        if (item.key === 'delete') onDelete();
      }}
    />
  );
}
