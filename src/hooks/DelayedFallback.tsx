import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';

interface DelayedFallbackProps {
  minDuration?: number; // 최소 표시 시간 (기본값: 1000ms)
  delay?: number; // 표시 시작 지연 (기본값: 200ms)
}

const DelayedFallback = ({
  minDuration = 1000,
  delay = 200,
}: DelayedFallbackProps) => {
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // ✅ const 사용
    const delayTimer = setTimeout(() => {
      setShow(true);
    }, delay);

    const hideTimer = setTimeout(() => {
      setShouldRender(false);
    }, delay + minDuration);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(hideTimer);
    };
  }, [delay, minDuration]);

  if (!shouldRender) return null;
  return show ? <Loading /> : null;
};

export default DelayedFallback;
