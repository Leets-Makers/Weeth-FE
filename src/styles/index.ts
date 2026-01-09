import { units } from '@/theme/designTokens';
import styled, { css } from 'styled-components';

export const PC = '1000px';
export const MOBILE = '375px';

export const pcResponsive = css`
  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;

export const ResponsiveContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  padding: 0 ${units.padding['450']}px;
`;
