import useGetMonthlySchedule, {
  getMonthlySchedule,
} from '@/api/useGetMonthSchedule';
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
import { toastError } from '../common/ToastMessage';

const formatDate = (date: Date | string) => dayjs(date).format('YYYY-MM-DD');

const MonthCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [searchParams] = useSearchParams();
  const year = Number(searchParams.get('year')) || CURRENT_YEAR;
  const month = Number(searchParams.get('month')) || CURRENT_MONTH;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventList, setSelectedEventList] = useState<any[]>([]);

  const eventListRef = useRef<HTMLDivElement | null>(null);

  const startDate = `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`;
  const endDate =
    month === 12
      ? new Date(year + 1, 1, 1, 23, 59, 59, 999).toISOString()
      : new Date(year, month + 1, 1, 23, 59, 59, 999).toISOString();

  const { monthlySchedule } = useGetMonthlySchedule(startDate, endDate);

  // 일정 end 날짜 보정 (마지막 날까지 표시되도록)
  const adjustedEvents = monthlySchedule.map((event: any) => ({
    ...event,
    allDay: true,
    end: dayjs(event.end).add(1, 'day').format('YYYY-MM-DD'),
  }));

  useEffect(() => {
    if (selectedEventList.length > 0 && eventListRef.current) {
      eventListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedEventList]);

  useEffect(() => {
    const selected = dayjs(selectedDate).format('YYYY-MM-DD');

    const fetchData = async () => {
      try {
        const response = await getMonthlySchedule(
          `${selected}T00:00:00.000Z`,
          `${selected}T23:59:59.999Z`,
        );
        setSelectedEventList(
          Array.isArray(response.data.data) ? response.data.data : [],
        );
      } catch (error) {
        console.error(error);
        toastError('데이터를 불러오지 못했습니다.');
        setSelectedEventList([]);
      }
    };

    fetchData();
  }, [selectedDate]);

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <S.Bar isMeeting={eventInfo.event.extendedProps?.isMeeting} />
        <div style={{ overflow: 'hidden', width: '42px' }}>
          {eventInfo.event.title}
        </div>
      </div>
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
          dayMaxEvents={3}
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
        <S.ScheduleList ref={eventListRef}>
          {selectedEventList.map((item) => (
            <ScheduleItem
              key={item.id}
              id={item.id}
              title={item.title}
              start={item.start}
              end={item.end}
              isMeeting={item.isMeeting}
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
