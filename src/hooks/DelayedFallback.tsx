import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';

interface DelayedFallbackProps {
  delay?: number;
}

const DelayedFallback = ({ delay = 200 }: DelayedFallbackProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(showTimer);
  }, [delay]);

  return visible ? <Loading /> : null;
};

export default DelayedFallback;
