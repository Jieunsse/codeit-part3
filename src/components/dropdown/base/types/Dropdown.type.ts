export type DropdownAlign = 'center' | 'left';

export interface DropdownItem<T extends string = string> {
  key: T;
  label: string;
}

export interface DropdownProps {
  items: DropdownItem[];
  width: number;
  onItemClick?: (item: DropdownItem) => void;
}
