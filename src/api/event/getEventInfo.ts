import api from '@/api/api';
import type { EventDetailData } from '@/types/event';

const getEventInfo = async (
  type: string | undefined,
  id: string | undefined,
): Promise<EventDetailData> => {
  if (!type || !id) {
    throw new Error('type과 id가 필요합니다.');
  }

  const response = await api.get(`/api/v1/${type}/${id}`);
  const { code, data, message } = response.data;

  if (code !== 200) {
    throw new Error(message || '데이터를 불러오지 못했습니다.');
  }

  return data;
};

export default getEventInfo;
