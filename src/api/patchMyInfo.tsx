import api from '@/api/api';

const patchMyInfo = async (data: Record<string, any>) => {
  const response = await api.patch(`/api/v1/users`, data);
  return response;
};

export default patchMyInfo;
