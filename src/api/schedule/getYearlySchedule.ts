import api from '@/api/api';

export type YearlyScheduleData = Record<number, any[]>;

const getYearlySchedule = async (
  year: number,
  semester: number,
): Promise<YearlyScheduleData> => {
  const response = await api.get(`/api/v1/schedules/yearly`, {
    params: { year, semester },
  });

  if (response.data.code !== 200) {
    throw new Error(response.data.message || '데이터를 불러오지 못했습니다.');
  }

  return response.data.data ?? {};
};

export default getYearlySchedule;
