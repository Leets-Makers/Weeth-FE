import useMonthlySchedule from '@/hooks/queries/schedule/useMonthlySchedule';
import * as S from '@/styles/calendar/MonthCalendar.styled';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  WEEK_DAYS,
} from '@/constants/dateConstants';
import ScheduleItem from '@/components/Calendar/ScheduleItem';
import Line from '@/components/common/Line';
import dayjs from 'dayjs';

const formatDate = (date: Date | string) => dayjs(date).format('YYYY-MM-DD');

const MonthCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [searchParams] = useSearchParams();
  const year = Number(searchParams.get('year')) || CURRENT_YEAR;
  const month = Number(searchParams.get('month')) || CURRENT_MONTH;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startDate = `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`;
  const endDate =
    month === 12
      ? new Date(year + 1, 1, 1, 23, 59, 59, 999).toISOString()
      : new Date(year, month + 1, 1, 23, 59, 59, 999).toISOString();

  const selectedStr = dayjs(selectedDate).format('YYYY-MM-DD');
  const selectedStart = `${selectedStr}T00:00:00.000Z`;
  const selectedEnd = `${selectedStr}T23:59:59.999Z`;

  const { data: monthlySchedule = [] } = useMonthlySchedule(startDate, endDate);
  const { data: selectedEventList = [] } = useMonthlySchedule(
    selectedStart,
    selectedEnd,
  );

  // 일정 end 날짜 보정 (마지막 날까지 표시되도록)
  const adjustedEvents = monthlySchedule.map((event: any) => ({
    ...event,
    allDay: true,
    end: dayjs(event.end).add(1, 'day').format('YYYY-MM-DD'),
  }));

  const renderDayCell = (arg: any) => {
    const formatted = formatDate(arg.date);
    const isToday = formatted === formatDate(new Date());
    const isSelected = formatted === formatDate(selectedDate);

    return (
      <div>
        {isSelected && (
          <S.SelectedDateOnCalendar>
            {arg.date.getDate()}
          </S.SelectedDateOnCalendar>
        )}
        {isToday && <S.Today>{arg.date.getDate()}</S.Today>}
        <div>{arg.date.getDate()}</div>
      </div>
    );
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <S.EventContentContainer>
        <S.Bar $isMeeting={eventInfo.event.extendedProps?.isMeeting} />
        <S.EventContent>{eventInfo.event.title}</S.EventContent>
      </S.EventContentContainer>
    );
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(year, month - 1));
    }
  }, [year, month]);

  const onDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
  };

  const onDateClick = (clickInfo: any) => {
    setSelectedDate(clickInfo.event.start);
  };

  return (
    <S.Container>
      <S.Calendar>
        <FullCalendar
          ref={calendarRef}
          selectable
          select={onDateSelect}
          longPressDelay={50}
          plugins={[dayGridPlugin, interactionPlugin]}
          events={adjustedEvents}
          eventContent={renderEventContent}
          eventClick={onDateClick}
          dayMaxEvents={2}
          moreLinkClick="none"
          locale="ko"
          headerToolbar={false}
          fixedWeekCount={false}
          dayCellContent={renderDayCell}
          height="auto"
        />
      </S.Calendar>

      <Line width="100%" />

      <S.SelectedDate>
        {dayjs(selectedDate).format('YYYY년 MM월 DD일')}{' '}
        <span>({WEEK_DAYS[dayjs(selectedDate).day()]})</span>
      </S.SelectedDate>

      {selectedEventList.length > 0 ? (
        <S.ScheduleList>
          {selectedEventList.map((item) => (
            <ScheduleItem
              key={item.id}
              id={item.id}
              title={item.title}
              start={item.start}
              end={item.end}
              isMeeting={item.isMeeting ?? false}
              year={year}
              month={month}
            />
          ))}
        </S.ScheduleList>
      ) : (
        <S.ScheduleList>
          <S.NoEvent>일정이 없습니다!</S.NoEvent>
        </S.ScheduleList>
      )}
    </S.Container>
  );
};

export default MonthCalendar;
