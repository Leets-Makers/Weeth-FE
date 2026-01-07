import SelectModal from '@/components/Modal/SelectModal';
import { createPortal } from 'react-dom';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {createPortal(<SelectModal />, document.getElementById('modal-root')!)}
      {children}
    </>
  );
};

export default ModalProvider;
