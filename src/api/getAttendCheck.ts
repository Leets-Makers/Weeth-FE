import api from '@/api/api';
import { ApiResponse, AttendData } from '@/types/attend';

export type AttendApiResponse = ApiResponse<AttendData>;

// 출석 조회 정보 받아오는 API
const getAttendCheck = async (): Promise<AttendData> => {
  const response = await api.get<AttendApiResponse>(
    `/api/v1/attendances/detail`,
  );

  return response.data.data;
};

export default getAttendCheck;
