import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReactNode } from 'react';

interface MenuModalState {
  isOpen: boolean;
  children: ReactNode | null;
  topPadding?: boolean;

  open: (params: { children: ReactNode; topPadding?: boolean }) => void;

  close: () => void;
}

const useMenuModalStore = create<MenuModalState>()(
  devtools(
    (set) => ({
      isOpen: false,
      children: null,
      topPadding: false,

      open: ({ children, topPadding }) =>
        set({
          isOpen: true,
          children,
          topPadding,
        }),

      close: () =>
        set({
          isOpen: false,
          children: null,
          topPadding: false,
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
