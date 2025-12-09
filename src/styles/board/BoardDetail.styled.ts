import styled from 'styled-components';
import theme from '@/styles/theme';
import { MOBILE, pcResponsive } from '@/styles';
import typography from '@/theme/typography';
import { colors, units } from '@/theme/designTokens';

export const Container = styled.div`
  width: 100%;
  max-width: ${MOBILE};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 60px;

  ${pcResponsive}
`;

export const BreadCrumContainer = styled.div`
  display: flex;
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
  padding: ${units.padding['450']}px ${units.padding['450']}px 0
    ${units.padding['450']}px;
`;

export const CrumbButton = styled.div`
  cursor: pointer;
`;

export const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${MOBILE};

  ${pcResponsive}
`;

export const TextButton = styled.div<{ $isLast?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${(props) =>
    props.$isLast ? 'none' : `1px solid ${theme.color.gray[30]}`};
  color: ${(props) => (props.$isLast ? theme.color.negative : 'white')};
`;
