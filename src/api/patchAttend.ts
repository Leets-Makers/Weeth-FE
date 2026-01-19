import api from '@/api/api';

interface AttendCheckType {
  code: string;
}

export const patchAttend = async (data: AttendCheckType) => {
  const response = await api.patch('/api/v1/attendances', data);
  return response;
};

export default patchAttend;
