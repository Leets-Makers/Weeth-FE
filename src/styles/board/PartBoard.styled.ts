import theme from '@/styles/theme';
import styled from 'styled-components';
import { PC, pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
`;

export const TabContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.semantic.line};
  padding: 0 ${units.padding['450']}px;
  gap: ${units.margin['200']}px;
`;

export const TabTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${units.margin['200']}px;
  cursor: pointer;
`;

export const TabText = styled.div<{ isActive: boolean }>`
  padding: ${units.padding['200']}px ${units.padding['100']}px 0
    ${units.padding['100']}px;
  ${typography.Button1}
  color: ${({ isActive }) =>
    isActive ? colors.semantic.text.normal : colors.semantic.text.alternative};
`;

export const Underline = styled.div`
  height: 2px;
  background-color: ${colors.semantic.brand.primary};
  margin-bottom: -1px;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${units.padding['400']}px ${units.padding['450']}px;
  gap: ${units.margin['200']}px;
`;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PostListItemContainer = styled.div`
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.semantic.container['neutral-interaction']};
  }
`;

export const Line = styled.div`
  border: 1px solid;
  width: 100%;
  color: ${(props) => props.theme.color.gray[18]};

  @media (min-width: ${PC}) {
    width: ${PC};
  }
`;

export const Text = styled.div`
  text-align: center;
  margin: 0.625rem;
  font-family: ${theme.font.semiBold};
`;

export const FloatingButton = styled.div`
  position: fixed;
  right: 16px;
  bottom: 24px;
  width: 44px;
  height: 45px;
  cursor: pointer;
  border: none;
  z-index: 1000;

  svg {
    width: 44px;
    height: 45px;
  }
`;
