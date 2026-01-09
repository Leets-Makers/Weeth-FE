import { units } from '@/theme/designTokens';
import styled, { css } from 'styled-components';
import typography from '@/theme/typography';

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

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${typography.H2};
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typography.H2};
`;
