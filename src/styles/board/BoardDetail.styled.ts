import styled from 'styled-components';
import theme from '@/styles/theme';
import { pcResponsive } from '@/styles';
import { units } from '@/theme/designTokens';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
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
  min-width: ${units.device.mobile}px;

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
