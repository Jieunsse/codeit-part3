import { useEffect, useState } from 'react';
import type { RecommendedWine } from '../apis/recommendedWines';
import { getRecommendedWines } from '../apis/recommendedWines';

type State = {
  data: RecommendedWine[];
  isLoading: boolean;
  error: unknown;
};

export function useRecommendedWines() {
  const [state, setState] = useState<State>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getRecommendedWines({ limit: 10 })
      .then((data) => {
        if (cancelled) return;
        setState({ data, isLoading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({ data: [], isLoading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
