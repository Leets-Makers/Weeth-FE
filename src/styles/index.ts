import { css } from 'styled-components';

export const PC = '1000px';
export const MOBILE = '375px';

export const pcResponsive = css`
  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;
