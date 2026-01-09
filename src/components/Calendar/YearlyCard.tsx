import icDot from '@/assets/images/ic_dot.svg';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import typography from '@/theme/typography';
import { colors, units } from '@/theme/designTokens';
import styled from 'styled-components';

export const StyledYear = styled.div`
  display: flex;
  width: 344px;
  margin: 0px 16px 16px 15px;
  flex-direction: column;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${colors.semantic.container.neutral};
  color: ${colors.semantic.text.normal};
  ${typography.Body2};
  border-radius: ${units.radius.lg}px;
  padding: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.img`
  padding-left: 8px;
  padding-right: 10px;
`;

export const MonthName = styled.div<{ $isToday: boolean }>`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) =>
    props.$isToday
      ? colors.semantic.brand.primary
      : colors.semantic.text.normal};
  ${typography.Sub1};
`;

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  isMeeting: boolean;
}

const EventComponent = ({ title }: { title: string }) => {
  return (
    <Content>
      <Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </Content>
  );
};

const YearlyCard = ({
  thisMonth,
  year,
  events,
}: {
  thisMonth: number;
  year: string | number;
  events: Event[];
}) => {
  let isToday;

  if (thisMonth === 1 || thisMonth === 2) {
    isToday = CURRENT_MONTH === thisMonth && CURRENT_YEAR - 1 === year;
  } else {
    isToday = CURRENT_MONTH === thisMonth && CURRENT_YEAR === year;
  }
  return (
    <StyledYear>
      <MonthName $isToday={isToday}>{thisMonth}월</MonthName>
      <ContentWrapper>
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} title={event.title} />
          ))
        ) : (
          <EventComponent title="일정이 없습니다!" />
        )}
      </ContentWrapper>
    </StyledYear>
  );
};

export default YearlyCard;
