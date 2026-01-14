import theme from '@/styles/theme';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  z-index: 2;
`;

export const Bar = styled.div<{ $isMeeting: boolean }>`
  width: 1.5px;
  height: 10px;
  background-color: ${({ $isMeeting }) =>
    $isMeeting ? colors.semantic.brand.primary : colors.semantic.icon.normal};
  border-radius: 20px;
  margin: 0 2px;
`;

export const EventContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EventContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const Calendar = styled.div`
  margin-bottom: 5px;

  div {
    text-overflow: clip !important;
  }

  .fc {
    font-size: 12px;
    border: none;
  }

  // 라이브러리 기본 오늘 표시 제거
  .fc-day-today {
    background-color: transparent !important;
  }

  // 선택한 날짜 표시 스타일링
  .fc-highlight {
    background-color: transparent !important;
  }

  // 월화수목금토일 표시 스타일링
  .fc-col-header-cell {
    background-color: ${colors.semantic.backGround};
    padding-bottom: 8px;
    border: none;
  }

  .fc-col-header {
    background-color: ${colors.semantic.backGround};
    border: 1.5px solid ${theme.color.gray[20]};
  }

  .fc .fc-scrollgrid-section,
  .fc .fc-scrollgrid-section table,
  .fc .fc-scrollgrid-section > td {
    padding-top: 15px;
  }

  .fc-daygrid-more-link {
    display: none !important;
  }

  // 셀 테두리 제거
  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
  }

  // 날짜 스타일링
  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    ${typography.Caption1};
  }

  // 주말 색상 변경
  .fc-day-sun a {
    color: #ff5858;
  }
  .fc-day-sat a {
    color: ${colors.dark.secondary[500]};
  }

  // 기본 일정 표시 스타일링
  .fc-event,
  .fc-event-dot {
    padding-right: 2px;
    display: flex;
    height: 16px;
    background-color: rgba(255, 255, 255, 0.03) !important;
    border: none;
    border-radius: 1px;
    ${typography.Caption1};
  }

  // 2일 이상 일정 표시 스타일링
  .fc-daygrid-event.fc-daygrid-block-event:first-child {
    display: flex;
    height: 20px;
    align-items: center;
    margin-left: 2px;
    border-radius: 1px;
  }

  .fc-event::after {
    display: none !important;
  }

  .fc-event-selected,
  .fc-event:focus {
    box-shadow: none;
  }

  .fc-event-main {
    overflow: hidden;
  }

  // 각 날짜 셀 스타일링
  .fc .fc-daygrid-day-events {
    height: 46px;
    margin: 0;
  }

  // 라이브러리 기본 스타일 제거
  .fc-daygrid-event-dot {
    display: none;
  }

  // 일정 시간 표시 제거
  .fc-event-time {
    display: none;
  }
`;

export const SelectedDateOnCalendar = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 2px;
  right: 0.5px;
  background-color: ${colors.semantic.container['primary-alternative']};
  border-radius: 10px;
  padding-top: 2px;
  width: 100%;
  height: 66px;
  z-index: 10;
  color: white !important;
`;

export const Today = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 2px;
  right: 0.5px;
  background-color: ${colors.dark.neutral[100]};
  border-radius: 10px;
  padding-top: 2px;
  width: 100%;
  height: 66px;
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 ${units.padding['450']}px;
`;

export const SelectedDate = styled.div`
  ${typography.Sub1};
  color: ${colors.semantic.text.normal};
  margin: 18px 0 15px 18px;
`;

export const NoEvent = styled.div`
  width: 100%;
  height: 63px;
  background-color: ${colors.semantic.container.neutral};
  border-radius: ${units.radius.md}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.semantic.text.alternative};
  font-weight: 500;
`;
