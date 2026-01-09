import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReactNode } from 'react';

interface MenuModalState {
  isOpen: boolean;
  children: ReactNode | null;
  mobileOnly?: boolean;

  open: (params: { children: ReactNode; mobileOnly?: boolean }) => void;

  close: () => void;
}

const useMenuModalStore = create<MenuModalState>()(
  devtools(
    (set) => ({
      isOpen: false,
      children: null,
      mobileOnly: false,

      open: ({ children, mobileOnly }) =>
        set({
          isOpen: true,
          children,
          mobileOnly,
        }),

      close: () =>
        set({
          isOpen: false,
          children: null,
          mobileOnly: false,
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
