import type { DropdownItem } from '../../base/types/Dropdown.type';
import type { WineType } from '../types/wine.types';

export const WINE_ITEMS: readonly DropdownItem<WineType>[] = [
  { key: 'red', label: 'Red' },
  { key: 'white', label: 'White' },
  { key: 'sparkling', label: 'Sparkling' },
] as const;
