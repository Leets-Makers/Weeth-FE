import { styled } from 'styled-components';
import theme from '@/styles/theme';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

// CommonCardinalModal.tsx
export const StyledModalOverlay = styled.div<{ overlayColor?: string }>`
  background-color: ${(props) => props.overlayColor || 'rgba(0,0,0,0.5)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.font.semiBold};
  color: #000;
`;

export const StyledModalContent = styled.div<{
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  position?: string;
}>`
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || 'auto'};
  position: fixed;
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left || '50%'};
  transform: translateX(-50%);
  transform: ${(props) =>
    props.top && props.left ? 'none' : 'translate(-50%, -50%)'};
  background-color: ${({ theme }) => theme.semantic.backGround};
  padding: 0;
  overflow: visible;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (max-width: 1024px) {
    left: 50%;
    transform: translateX(-10%);
    width: 45%;
  }

  @media (max-width: 900px) {
    left: 50%;
    transform: translateX(-10%);
    width: 45%;
  }

  @media (max-width: 600px) {
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div<{ borderBottom?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const TitleText = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

export const MainContent = styled.div<{ borderBottom?: boolean }>`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  overflow: visible;
`;

export const Footer = styled.div`
  background-color: ${theme.color.gray[100]};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

// CardinalEditModal.tsx
export const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  width: calc(100% - 40px);
  max-width: 360px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  position: relative;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.semantic.state.caution};
  font-size: 14px;
`;

export const StyledInput = styled.input<{ flex: number; maxWidth: string }>`
  ${typography.admin.Body1}
  flex: ${({ flex }) => flex};
  max-width: ${({ maxWidth }) => maxWidth};
  border-radius: ${units.radius.sm}px;
  border: none;
  padding: 12px;
  &::placeholder {
    color: ${theme.color.gray[65]};
  }

  // readOnly 일 때 색상 변경
  ${({ readOnly }) =>
    readOnly
      ? `
      color: ${theme.color.gray[65]};
      cursor: not-allowed;
      &:focus {
      outline: none
      }
      `
      : `
      &:focus {
      outline: 2px solid #2f2f2f;
      }
    `}
`;

// CardinalModal.tsx
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  position: relative;
  background-color: ${({ theme }) => theme.semantic.container.neutral};
  border-radius: ${units.radius.sm}px;

  &:focus-within input::placeholder {
    color: transparent;
  }

  &:focus-within {
    outline: 2px solid #2f2f2f;
  }
`;

export const Input = styled.input<{ readOnly?: boolean }>`
  ${typography.admin.Body1}
  flex-grow: 1;
  width: 100%;
  border: none;
  outline: none;
  text-align: right;
  padding: 0 30px 0 0;
  background-color: ${({ theme }) => theme.semantic.container.neutral};

  ${({ readOnly }) =>
    readOnly &&
    `
    color: ${theme.color.gray[65]};
    cursor: not-allowed;
  `}
`;

export const Unit = styled.span`
  position: absolute;
  right: 16px;
  color: ${({ theme }) => theme.semantic.text.disabled};
  font-size: 14px;
`;

export const Title = styled.div`
  ${typography.admin.H3}
  margin-top: -30px;
  padding-bottom: 10px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px;
`;

export const SvgText = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.div`
  ${typography.admin.Sub2}
`;

// MemberDetailModal.tsx
export interface FontStyleProps {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
}

export const FontStyle = styled.div<FontStyleProps>`
  ${typography.admin.Body1}
  font-size: ${({ fontSize }) => fontSize || typography.admin.Body1.fontSize};
  font-weight: ${({ fontWeight }) =>
    fontWeight || typography.admin.Body1.fontWeight};
  color: ${({ color }) => color};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 96px - 96px);
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 5px;
  white-space: nowrap;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: ${units.radius.md}px;
  width: 100%;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  flex: 1.5;
`;

export const ActivityContent = styled(ModalContent)`
  flex: 1;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
`;

export const NameStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #a6a6a6;
`;

export const DataFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #000;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  margin-right: 40px;

  @media (max-width: 1300px) {
    & > button:last-child {
      display: none;
    }
    justify-content: center;
    margin-left: -10px;
  }
`;
