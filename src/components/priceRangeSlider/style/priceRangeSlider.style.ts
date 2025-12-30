import { cva } from 'class-variance-authority';

export const rangeInput = cva(
  [
    // 베이스
    'absolute inset-0 w-full appearance-none bg-transparent',
    'pointer-events-none',

    /* 웹킷 -> 크롬 & 사파리*/
    '[&::-webkit-slider-runnable-track]:appearance-none',
    '[&::-webkit-slider-runnable-track]:bg-transparent',

    '[&::-webkit-slider-thumb]:pointer-events-auto',
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:h-[20px]',
    '[&::-webkit-slider-thumb]:w-[20px]',
    '[&::-webkit-slider-thumb]:rounded-full',
    '[&::-webkit-slider-thumb]:bg-white',
    '[&::-webkit-slider-thumb]:border',
    '[&::-webkit-slider-thumb]:border-gray-300',
    '[&::-webkit-slider-thumb]:shadow-[0_2px_20px_#0000000A]',
    '[&::-webkit-slider-thumb]:relative',
    '[&::-webkit-slider-thumb]:z-30',

    /* 파이어폭스 */
    '[&::-moz-range-track]:bg-transparent',

    '[&::-moz-range-thumb]:h-[20px]',
    '[&::-moz-range-thumb]:w-[20px]',
    '[&::-moz-range-thumb]:rounded-full',
    '[&::-moz-range-thumb]:bg-white',
    '[&::-moz-range-thumb]:border',
    '[&::-moz-range-thumb]:border-gray-300',
    '[&::-moz-range-thumb]:shadow-[0_2px_20px_#0000000A]',
  ],
  {
    variants: {
      z: {
        front: 'z-20',
        back: 'z-10',
      },
    },
  },
);
