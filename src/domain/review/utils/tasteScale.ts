import { TASTE } from '@src/shared/constants/taste';

export function uiToServerTaste(value: number): number {
  return Math.min(TASTE.SERVER_MAX, Math.max(TASTE.SERVER_MIN, Math.round(value / TASTE.STEP)));
}

export function serverToUiTaste(value: number): number {
  return value * TASTE.STEP;
}
