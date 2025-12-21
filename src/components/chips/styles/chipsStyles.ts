import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  [
    'inline-flex items-center justify-center',
    'h-[42px]',
    'gap-[10px]',
    'py-[10px] px-[18px]',
    'rounded-full',

    'text-sm font-medium',
    'whitespace-nowrap',
    'cursor-pointer',
  ].join(' '),
  {
    variants: {
      color: {
        white: 'bg-[var(--color-white)] text-[var(--color-black)]',
        purple: 'bg-[var(--color-primary-purple-100)] text-[var(--color-white)]',
      },
    },
    defaultVariants: {
      color: 'white',
    },
  },
);
