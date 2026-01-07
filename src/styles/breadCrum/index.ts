import styled from 'styled-components';
import typography from '@/theme/typography';
import { colors, units } from '@/theme/designTokens';

export const BreadCrumContainer = styled.div<{ $hasTitle?: boolean }>`
  display: flex;
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
  ${({ $hasTitle }) =>
    !$hasTitle ? `padding: ${units.padding['450']}px;` : ''}
`;

export const CrumbButton = styled.div`
  cursor: pointer;
`;
