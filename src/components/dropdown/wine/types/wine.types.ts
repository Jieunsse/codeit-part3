export type WineType = 'red' | 'white' | 'sparkling';

export interface WineTypeDropdownProps {
  onClick: (wineType: WineType) => void;
}
