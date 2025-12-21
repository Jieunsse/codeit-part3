import { twMerge } from 'tailwind-merge';
import { chipVariants } from './styles/chipsStyles';
import type { ChipsProps } from './types/chipsTypes';

export function Chips({ title, color }: ChipsProps) {
  return <div className={twMerge(chipVariants({ color }))}>{title}</div>;
}
