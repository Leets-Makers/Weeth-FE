import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
dayjs.extend(tz);

export const getLatestPenaltyDate = (penalties?: { time: string }[]) => {
  if (!penalties || penalties.length === 0) return '없음';
  return penalties
    .map((p) => dayjs(p.time).tz('Asia/Seoul'))
    .sort((a, b) => b.valueOf() - a.valueOf())[0]
    .format('YYYY.MM.DD');
};
