import useHeaderStore, { RightButtonType } from '@/stores/useHeaderStore';
import { useLayoutEffect } from 'react';

interface HeaderType {
  title?: string;
  rightButtonType?: RightButtonType;
  isComplete?: boolean;
  isAccessible?: boolean;
  isWaiting?: boolean;
  centerContent?: React.ReactNode;
  onClickRightButton?: () => void;
}

const useSetHeader = (config: HeaderType) => {
  const { setHeader, resetHeader } = useHeaderStore();

  useLayoutEffect(() => {
    resetHeader();
    setHeader(config);
  }, []);
};

export default useSetHeader;
