import dayjs from 'dayjs';
import parse from 'html-react-parser';
import icCalendar from '@/assets/images/ic_date.svg';
import { WEEK_DAYS } from '@/constants/dateConstants';
import type { EventDetailData } from '@/types/event';
import * as S from '@/styles/event/EventContent.styled';
import convertLinksInText from '@/hooks/convertLinksInText';

const EventContent = ({ data }: { data: EventDetailData }) => {
  const start = dayjs(data.start);
  const end = dayjs(data.end);

  const isOneday = start.isSame(end, 'day');

  return (
    <S.Container>
      <S.ContentBlock>
        {isOneday ? (
          <S.Time>
            <img src={icCalendar} alt="calendar" style={{ marginRight: 5 }} />
            <div>
              {dayjs(data.start).format('YYYY년 M월 D일')} (
              {WEEK_DAYS[new Date(data.start).getDay()]}){' '}
              {dayjs(data.start).format('HH:mm')} ~{' '}
              {dayjs(data.end).format('HH:mm')}
            </div>
          </S.Time>
        ) : (
          <>
            <S.Time>
              <img src={icCalendar} alt="calendar" style={{ marginRight: 5 }} />
              <div>
                {dayjs(data.start).format('YYYY년 M월 D일')} (
                {WEEK_DAYS[new Date(data.start).getDay()]}){' '}
                {dayjs(data.start).format('HH:mm')}
              </div>
            </S.Time>
            <S.Time>
              <S.EndTime>
                ~ {dayjs(data.end).format('YYYY년 M월 D일')} (
                {WEEK_DAYS[new Date(data.start).getDay()]}){' '}
                {dayjs(data.end).format('HH:mm')}
              </S.EndTime>
            </S.Time>
          </>
        )}
      </S.ContentBlock>
      <S.ContentBlock>
        <div>장소 : {data.location} </div>
        <div>준비물 : {data.requiredItem}</div>
      </S.ContentBlock>
      <S.ContentBlock>
        <div>{parse(convertLinksInText(data.content))}</div>
      </S.ContentBlock>
    </S.Container>
  );
};

export default EventContent;
