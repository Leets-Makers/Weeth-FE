import api from '@/api/api';
import { ApiResponse } from '@/types';

export interface Cardinal {
  id: number;
  cardinalNumber: number;
  status: 'IN_PROGRESS' | 'DONE' | string;
  currentCardinal?: number;
}

export const getAllCardinals = async (): Promise<Cardinal[]> => {
  const response = await api.get<ApiResponse<Cardinal[]>>('/api/v1/cardinals');

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  const body = response as unknown as ApiResponse<Cardinal[]>;
  if (body.data && Array.isArray(body.data)) {
    return body.data;
  }

  return [];
};

export default getAllCardinals;
