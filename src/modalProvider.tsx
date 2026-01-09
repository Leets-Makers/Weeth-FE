import SelectModal from '@/components/Modal/SelectModal';
import { createPortal } from 'react-dom';
import MenuModal from './components/Modal/MenuModal';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {createPortal(
        <>
          <SelectModal />
          <MenuModal />
        </>,
        document.getElementById('modal-root')!,
      )}
      {children}
    </>
  );
};

export default ModalProvider;
