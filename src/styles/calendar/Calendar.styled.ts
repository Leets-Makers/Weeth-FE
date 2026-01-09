import styled from 'styled-components';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import { MOBILE, pcResponsive } from '..';

export const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: ${MOBILE};
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${units.padding['450']}px;
  box-sizing: border-box;
`;

export const CalendarToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Title = styled.div`
  ${typography.Sub1};
`;

export const ImgButton = styled.img`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const FloatingButton = styled.div`
  position: fixed;
  right: calc(max(0px, (100vw - ${MOBILE}) / 2) + 16px);
  bottom: 24px;
  width: 44px;
  height: 45px;
  cursor: pointer;
  border: none;
  z-index: 1000;

  svg {
    width: 44px;
    height: 45px;
  }
`;
