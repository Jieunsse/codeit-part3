import { twMerge } from 'tailwind-merge';
import { chipVariants } from './styles/chipsStyles';
import type { ChipsProps } from './types/chipsTypes';

export function Chips({ title, selected = false, onClick }: ChipsProps) {
  return (
    <button type="button" className={twMerge(chipVariants({ selected }))} onClick={onClick}>
      {title}
    </button>
  );
}
