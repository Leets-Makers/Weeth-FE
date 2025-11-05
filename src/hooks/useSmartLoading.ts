import { useEffect, useMemo, useState } from 'react';

export default function useSmartLoading<T>(promise: Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let didCancel = false;
    let didShowLoading = false;
    const showTimer = setTimeout(() => {
      if (!didCancel) {
        didShowLoading = true;
        setLoading(true);
      }
    }, 100);

    let hideTimer: NodeJS.Timeout;

    promise.then((res) => {
      if (didCancel) return;

      if (didShowLoading) {
        hideTimer = setTimeout(() => {
          if (!didCancel) {
            setLoading(false);
            setData(res);
          }
        }, 1000);
      } else {
        clearTimeout(showTimer);
        setLoading(false);
        setData(res);
      }
    });

    return () => {
      didCancel = true;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [promise]);

  return { loading, data };
}

export function useSmartCombinedLoading(...loadings: boolean[]) {
  const isLoading = loadings.some(Boolean);
  const [hasMounted, setHasMounted] = useState(false);
  const [minDelay, setMinDelay] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setMinDelay(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const memoizedPromise = useMemo(
    () =>
      new Promise<void>((resolve) => {
        if (!isLoading) resolve();
      }),
    [isLoading],
  );

  const { loading: smartLoading } = useSmartLoading(memoizedPromise);

  return !hasMounted || isLoading || smartLoading || minDelay;
}
