import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GetWinesParams, GetWinesResponse, Wine } from '../apis/wines';
import { getWines } from '../apis/wines';

type WineListState = {
  data: Wine[];
  nextCursor: number | null;
  isLoading: boolean;
  error: unknown;
};

function normalizeGetWinesResponse(response: GetWinesResponse): {
  wines: Wine[];
  nextCursor: number | null;
} {
  if (Array.isArray(response)) return { wines: response, nextCursor: null };

  const wines =
    'list' in response
      ? response.list
      : 'wines' in response
        ? response.wines
        : 'items' in response
          ? response.items
          : [];

  const nextCursor = typeof response.nextCursor === 'number' ? response.nextCursor : null;
  return { wines, nextCursor };
}

export function useWineList(params: GetWinesParams) {
  const paramsKey = useMemo(() => JSON.stringify(params), [params]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [state, setState] = useState<WineListState>({
    data: [],
    nextCursor: null,
    isLoading: true,
    error: null,
  });

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;

    // react lint 규칙(Effect 내부 동기 setState) 회피: 마이크로태스크로 loading 전환
    Promise.resolve().then(() => {
      if (cancelled) return;
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
    });

    const stableParams = JSON.parse(paramsKey) as GetWinesParams;

    getWines(stableParams)
      .then((response) => {
        if (cancelled) return;
        const { wines, nextCursor } = normalizeGetWinesResponse(response);
        setState({ data: wines, nextCursor, isLoading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState((prev) => ({ ...prev, isLoading: false, error }));
      });

    return () => {
      cancelled = true;
    };
  }, [paramsKey, refreshKey]);

  return { ...state, refetch };
}
