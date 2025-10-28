import useHeaderStore, { RightButtonType } from '@/stores/useHeaderStore';
import { useLayoutEffect } from 'react';

interface HeaderType {
  title?: string;
  rightButtonType?: RightButtonType;
  isComplete?: boolean;
  isAccessible?: boolean;
  isWaiting?: boolean;
  onClickRightButton?: () => void;
}

const useSetHeader = (config: HeaderType) => {
  const { setHeader } = useHeaderStore();

  useLayoutEffect(() => {
    setHeader(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSetHeader;
