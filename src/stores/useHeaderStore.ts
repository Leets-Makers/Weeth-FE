import { create } from 'zustand';

export type RightButtonType =
  | 'TEXT'
  | 'MENU'
  | 'PLUS'
  | 'EDIT'
  | 'SEARCH'
  | 'WRITING'
  | 'POST'
  | 'INFO'
  | 'ADMIN'
  | 'none';

interface HeaderState {
  title: string;
  rightButtonType: RightButtonType;
  isComplete: boolean;
  isAccessible: boolean;
  isWaiting: boolean;
  onClickRightButton?: () => void;
  setHeader: (config: Partial<HeaderState>) => void;
  resetHeader: () => void;
}

const useHeaderStore = create<HeaderState>((set) => ({
  title: '',
  rightButtonType: 'none',
  isComplete: true,
  isAccessible: true,
  isWaiting: false,
  onClickRightButton: undefined,

  setHeader: (config) => set((state) => ({ ...state, ...config })),
  resetHeader: () =>
    set({
      title: '',
      rightButtonType: 'none',
      isComplete: true,
      isAccessible: true,
      isWaiting: false,
      onClickRightButton: undefined,
    }),
}));

export default useHeaderStore;
