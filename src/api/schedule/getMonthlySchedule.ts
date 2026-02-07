import api from '@/api/api';
import type { ScheduleEvent } from '@/types/schedule';

const getMonthlySchedule = async (
  start: string,
  end: string,
): Promise<ScheduleEvent[]> => {
  const response = await api.get(`/api/v1/schedules/monthly`, {
    params: { start, end },
  });

  if (response.data.code !== 200) {
    throw new Error(response.data.message || '데이터를 불러오지 못했습니다.');
  }

  const { data } = response.data;
  return Array.isArray(data) ? data : [];
};

export default getMonthlySchedule;
