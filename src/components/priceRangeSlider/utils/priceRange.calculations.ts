export const calculatePercentage = (value: number, min: number, max: number): number =>
  ((value - min) / (max - min)) * 100;

export const clampMinValue = (value: number, maxValue: number, step: number): number =>
  Math.min(value, maxValue - step);

export const clampMaxValue = (value: number, minValue: number, step: number): number =>
  Math.max(value, minValue + step);
