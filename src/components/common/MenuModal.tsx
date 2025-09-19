import styled, { css } from 'styled-components';
import theme from '@/styles/theme';
import { MOBILE, PC } from '@/styles';

const Container = styled.div`
  position: fixed;
  inset: 0;
  top: 0;
  left: 0;
  z-index: 100;

  @media (max-width: ${PC}) {
    width: ${PC};
  }
`;

const ModalContainer = styled.div<{ $mobileOnly?: boolean }>`
  position: fixed;
  top: 55px;
  z-index: 1000;
  right: calc((100vw - min(100vw, ${MOBILE})) / 2 + 18px);
  max-width: ${MOBILE};

  ${({ $mobileOnly }) =>
    !$mobileOnly &&
    css`
      @media (min-width: ${PC}) {
        right: calc((100vw - ${PC}) / 2 + 18px);
        max-width: ${PC};
      }
    `}
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
  z-index: 100;
`;

const MenuModal = ({
  children,
  onClose,
  mobileOnly,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  mobileOnly?: boolean;
}) => {
  return (
    <Container onClick={onClose}>
      <ModalContainer $mobileOnly={mobileOnly}>
        <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
      </ModalContainer>
    </Container>
  );
};

export default MenuModal;
