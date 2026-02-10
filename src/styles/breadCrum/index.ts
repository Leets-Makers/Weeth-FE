import styled from 'styled-components';
import typography from '@/theme/typography';
import BreadcrumHome from '@/assets/images/ic_breadcrum_home.svg?react';
import { colors, units } from '@/theme/designTokens';

export const BreadcrumbPadding = styled.div`
  padding-left: ${units.padding['450']}px;
`;

export const BreadcrumHomeIcon = styled(BreadcrumHome)`
  cursor: pointer;
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
