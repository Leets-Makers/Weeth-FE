import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const TitleWrapper = styled.div`
  ${typography.H3};
  display: block;
  width: 100%;
  margin-top: ${units.margin[500]}px;
`;

export const Progress = styled.div<{ $attendPercent: number }>`
  width: 100%;
  height: 15px;
  background-color: ${({ $attendPercent }) =>
    $attendPercent === 0
      ? colors.semantic.container.neutral
      : colors.semantic.state.error};
  border-radius: 4px;
  overflow: hidden;
  margin-top: ${units.margin[300]}px;
`;

export const Dealt = styled.div<{ $dealt: number }>`
  width: ${(props) => `${props.$dealt}%`};
  height: 100%;
  border-radius: 4px;
  background-color: ${colors.semantic.brand.primary};
`;
