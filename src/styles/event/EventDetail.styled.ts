import theme from '@/styles/theme';
import styled from 'styled-components';
import { units } from '@/theme/designTokens';
import { pcResponsive } from '..';

export const EventDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: ${theme.font.semiBold};
`;
