import styled from 'styled-components';
import { MOBILE, PC } from '@/styles';
import { useMenuModal } from '@/stores/menuModalStore';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';

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

const ModalContainer = styled.div<{
  $topPadding?: boolean;
  $floatingButtonPosition?: boolean;
  $headerButtonTop?: number;
  $headerButtonRight?: number;
}>`
  position: fixed;
  ${({ $floatingButtonPosition, $topPadding, $headerButtonTop }) => {
    if ($floatingButtonPosition) {
      return `bottom: calc(24px + 45px + 8px);`;
    }
    if ($headerButtonTop !== undefined) {
      return `top: ${$headerButtonTop}px;`;
    }
    return `top: ${$topPadding ? '140px' : '130px'};`;
  }}

  z-index: 1000;
  ${({ $floatingButtonPosition, $headerButtonRight }) => {
    if ($floatingButtonPosition) {
      return `right: 16px;`;
    }
    if ($headerButtonRight !== undefined) {
      return `right: ${$headerButtonRight}px;`;
    }
    return `right: ${`calc((100vw - min(100vw, ${PC})) / 2 + 18px)`};`;
  }}
  width: ${MOBILE};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 144px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: 10px;

  background-color: ${colors.semantic.container.neutral};

  ${typography.Button2};
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  z-index: 100;
`;

const MenuModal = () => {
  const {
    isOpen,
    children,
    topPadding,
    floatingButtonPosition,
    headerButtonTop,
    headerButtonRight,
    close,
  } = useMenuModal();

  if (!isOpen || !children) return null;

  return (
    <Container onClick={close}>
      <ModalContainer
        $topPadding={topPadding}
        $floatingButtonPosition={floatingButtonPosition}
        $headerButtonTop={headerButtonTop}
        $headerButtonRight={headerButtonRight}
      >
        <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
      </ModalContainer>
    </Container>
  );
};

export default MenuModal;
