import theme from '@/styles/theme';
import closeIcon from '@/assets/images/ic_admin_close.svg';
import Modal from 'react-modal';
import { styled } from 'styled-components';
import { units } from '@/theme/designTokens';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  height?: string;
  top?: string;
  isCardinalModal?: boolean;
}

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 1000;
`;

const Title = styled.div`
  color: #000;
  font-weight: 700;
  font-size: 24px;
  padding-left: 20px;
`;

const TitleContainer = styled.div`
  background-color: ${({ theme }) => theme.semantic.backGround};
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const MainContent = styled.div`
  background-color: ${({ theme }) => theme.semantic.backGround};
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
`;

const Footer = styled.div`
  background-color: ${({ theme }) => theme.semantic.container.neutral};
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: relative;
  bottom: 0;
  flex-shrink: 0;
`;

export const CloseIcon = styled.img<{ isCardinalModal?: boolean }>`
  cursor: pointer;
  margin-right: ${({ isCardinalModal }) => (isCardinalModal ? '0' : '20px')};
`;

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  height = 'auto',
  top = '35%',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 900,
        },
        content: {
          top,
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: units.radius.lg,
          width: '50%',
          height,
          maxWidth: '830px',
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <ModalContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <CloseIcon src={closeIcon} alt="close" onClick={onClose} />
        </TitleContainer>
        <MainContent>{children}</MainContent>
        <Footer>{footer}</Footer>
      </ModalContainer>
    </Modal>
  );
};

export default CommonModal;
