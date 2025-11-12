import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';

interface DelayedFallbackProps {
  delay?: number;
  minDuration?: number;
}

const DelayedFallback = ({
  delay = 200,
  minDuration = 800,
}: DelayedFallbackProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);

    return () => clearTimeout(showTimer);
  }, [delay]);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    if (visible) {
      hideTimer = setTimeout(() => setVisible(false), delay + minDuration);
    }
    return () => clearTimeout(hideTimer);
  }, [visible, delay, minDuration]);

  return visible ? <Loading /> : null;
};

export default DelayedFallback;
