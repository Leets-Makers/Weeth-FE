import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SelectModalType = 'positive' | 'negative';

export interface SelectModalProps {
  title: string;
  content: string;
  buttonContent?: string;
  type?: SelectModalType;
  visibility?: boolean;
  cancelText?: string;
  onDelete?: () => void;
}

interface SelectModalState {
  isOpen: boolean;
  modalProps: SelectModalProps | null;

  open: (props: SelectModalProps) => void;
  close: () => void;
}

const DEFAULT_PROPS: Partial<SelectModalProps> = {
  buttonContent: '삭제',
  type: 'negative',
  visibility: true,
  cancelText: '취소',
};

export const useSelectModalStore = create<SelectModalState>()(
  devtools(
    (set) => ({
      isOpen: false,
      modalProps: null,

      open: (props) =>
        set({
          isOpen: true,
          modalProps: {
            ...DEFAULT_PROPS,
            ...props,
          },
        }),

      close: () =>
        set({
          isOpen: false,
          modalProps: null,
        }),
    }),
    { name: 'selectModalStore' },
  ),
);
export const useOpenSelectModal = () => {
  const open = useSelectModalStore((state) => state.open);
  return open;
};

export const useCloseSelectModal = () => {
  const close = useSelectModalStore((state) => state.close);
  return close;
};

export const useSelectModal = () => {
  const store = useSelectModalStore();
  return store;
};
