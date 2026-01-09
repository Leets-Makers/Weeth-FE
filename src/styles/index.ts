import typography from '@/theme/typography';
import styled, { css } from 'styled-components';

export const PC = '1000px';
export const MOBILE = '375px';

export const pcResponsive = css`
  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
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
