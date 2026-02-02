import api from '@/api/api';
import { AttendInfo } from '@/types/attend';

export const getAttendInfo = async (): Promise<AttendInfo> => {
  const response = await api.get(`/api/v1/attendances`);
  return response.data.data;
};

export default getAttendInfo;
