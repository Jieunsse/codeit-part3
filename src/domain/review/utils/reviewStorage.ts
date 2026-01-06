const STORAGE_PREFIX = 'review-ids';

export function loadReviewIds(wineId: number): number[] {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}:${wineId}`);
  return stored ? JSON.parse(stored) : [];
}

export function saveReviewId(wineId: number, reviewId: number) {
  const ids = loadReviewIds(wineId);
  localStorage.setItem(`${STORAGE_PREFIX}:${wineId}`, JSON.stringify([reviewId, ...ids]));
}
