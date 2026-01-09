import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE } from '..';

export const EventDetailWrapper = styled.div`
  width: ${MOBILE};
  margin-bottom: 50px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: ${theme.font.semiBold};
`;
