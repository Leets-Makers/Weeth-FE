import styled from 'styled-components';
import theme from '@/styles/theme';
import { MOBILE, PC } from '@/styles';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;

  @media (max-width: ${PC}) {
    width: ${PC};
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: ${MOBILE};
  position: absolute;
  top: 55px;
  left: 45%;
  transform: translate(-50%);

  @media (min-width: ${PC}) {
    max-width: ${PC};
    left: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 144px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: 18px;

  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  font-size: 14px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const MenuModal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <Container onClick={onClose}>
      <ModalContainer>
        <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
      </ModalContainer>
    </Container>
  );
};

export default MenuModal;
