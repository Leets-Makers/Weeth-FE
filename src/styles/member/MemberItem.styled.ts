import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 10px ${units.padding['400']}px;
  min-width: 339px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${colors.semantic.container.neutral};
  border-radius: 10px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.div`
  ${typography.Sub1};
`;

export const Caption = styled.div`
  display: flex;
  gap: 5px;
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
`;
