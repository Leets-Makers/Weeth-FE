import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReactNode } from 'react';

interface MenuModalState {
  isOpen: boolean;
  children: ReactNode | null;
  topPadding?: boolean;
  floatingButtonPosition?: boolean;
  headerButtonTop?: number;
  headerButtonRight?: number;

  open: (params: {
    children: ReactNode;
    topPadding?: boolean;
    floatingButtonPosition?: boolean;
    headerButtonTop?: number;
    headerButtonRight?: number;
  }) => void;

  close: () => void;
}

const useMenuModalStore = create<MenuModalState>()(
  devtools(
    (set) => ({
      isOpen: false,
      children: null,
      topPadding: false,
      floatingButtonPosition: false,
      headerButtonTop: undefined,
      headerButtonRight: undefined,

      open: ({
        children,
        topPadding,
        floatingButtonPosition,
        headerButtonTop,
        headerButtonRight,
      }) =>
        set({
          isOpen: true,
          children,
          topPadding,
          floatingButtonPosition,
          headerButtonTop,
          headerButtonRight,
        }),

      close: () =>
        set({
          isOpen: false,
          children: null,
          topPadding: false,
          floatingButtonPosition: false,
          headerButtonTop: undefined,
          headerButtonRight: undefined,
        }),
    }),
    { name: 'menuModalStore' },
  ),
);

export const useOpenMenuModal = () => {
  const open = useMenuModalStore((state) => state.open);
  return open;
};

export const useCloseMenuModal = () => {
  const close = useMenuModalStore((state) => state.close);
  return close;
};

export const useMenuModal = () => {
  const store = useMenuModalStore();
  return store;
};
