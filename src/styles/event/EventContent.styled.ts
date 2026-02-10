import theme from '@/styles/theme';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';
import { pcResponsive } from '..';

export const Container = styled.div`
  width: 100%;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  padding: 0 ${units.padding['450']}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  gap: ${units.margin['300']}px;
`;

export const ContentBlock = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${typography.Body1};
  color: ${colors.semantic.text.normal};
  background-color: ${colors.semantic.container.neutral};
  padding: ${units.padding['300']}px ${units.padding['400']}px;
  border-radius: ${units.radius.lg}px;
  white-space: pre-wrap;

  a {
    color: ${colors.semantic.brand.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${colors.semantic.brand.primary};
  }
`;

export const ModalSetting = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 9px;
  position: fixed;
  top: 10px;
  right: 15px;
`;

export const ImgButton = styled.img`
  cursor: pointer;
`;

export const Date = styled.div`
  font-size: 48px;
  font-family: ${theme.font.semiBold};
`;

export const Title = styled.div<{ $isFullScreen: boolean }>`
  padding-top: 15px;
  font-family: ${theme.font.semiBold};

  ${({ $isFullScreen }) =>
    $isFullScreen
      ? `
        font-size: 100px;
        color: ${theme.color.gray[65]};
      `
      : ``}
`;

export const AttendanceCode = styled.div<{ $isFullScreen: boolean }>`
  padding-bottom: 20px;
  color: ${theme.color.main};
  font-size: 48px;
  font-family: ${theme.font.semiBold};

  ${({ $isFullScreen }) =>
    $isFullScreen
      ? `
        font-size: 300px;
      `
      : ``}
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EndTime = styled.div`
  padding-left: 25px;
`;
