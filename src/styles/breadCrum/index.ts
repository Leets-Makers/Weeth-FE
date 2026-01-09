import styled from 'styled-components';
import typography from '@/theme/typography';
import { colors, units } from '@/theme/designTokens';

export const BreadcrumbPadding = styled.div`
  padding-left: ${units.padding['450']}px;
`;

export const BreadCrumContainer = styled.div<{ $hasTitle?: boolean }>`
  display: flex;
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
  padding: ${({ $hasTitle }) =>
    $hasTitle
      ? `${units.padding['450']}px 0 ${units.margin['200']}px 0`
      : `${units.padding['450']}px 0`};
`;

export const CrumbButton = styled.div`
  cursor: pointer;
`;
