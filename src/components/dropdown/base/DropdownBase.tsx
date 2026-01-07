import { DROPDOWN } from './constants/Dropdown.constants';
import type { DropdownItem, DropdownAlign } from './types/Dropdown.type';

interface DropdownBaseProps {
  items: readonly DropdownItem[];
  width: number;
  align?: DropdownAlign;
  onItemClick: (item: DropdownItem) => void;
}

export function DropdownBase({ items, width, align = 'center', onItemClick }: DropdownBaseProps) {
  return (
    <div
      className="border border-gray-300 p-1"
      style={{ width, borderRadius: DROPDOWN.BORDER_RADIUS }}
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onItemClick(item)}
          className={[
            'flex h-[46px] w-full cursor-pointer rounded-[12px]',
            'px-[22px] py-[10px]',
            'text-lg leading-[26px] font-medium text-gray-800',
            'hover:bg-primary-purple-10 hover:text-primary-purple-100',
            align === 'center'
              ? 'items-center justify-center text-center'
              : 'items-center justify-start text-left',
          ].join(' ')}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
