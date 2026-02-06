import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(weekday);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(isoDate: string) {
  return dayjs(isoDate).format('MM/DD');
}

export function formatDateTime(isoDate: string) {
  dayjs.locale('ko');
  const formatted = dayjs(isoDate);
  return formatted.format('M월 D일 (ddd) HH:mm');
}

dayjs.extend(customParseFormat);
dayjs.locale('ko');

export function parseToTime12h(dateStr: string): string {
  const d = dayjs(dateStr).tz('Asia/Seoul');
  const hour = d.hour();
  const minute = d.minute();
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

export function formatMeetingDates(meetingStart: string, meetingEnd: string) {
  const startDate = dayjs(meetingStart);
  const endDate = dayjs(meetingEnd);

  const startDateTime = startDate.format('YYYY년 M월 D일');

  const startTime = startDate.format('HH:mm');
  const endTime = endDate.format('HH:mm');

  return `${startDateTime} (${startTime} ~ ${endTime})`;
}

export default formatDate;
