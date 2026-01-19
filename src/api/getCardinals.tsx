// api/getAllCardinals.ts
import api from '@/api/api';
import { ApiResponse } from '@/types';

export interface Cardinal {
  id: number;
  cardinalNumber: number;
  status: 'IN_PROGRESS' | 'DONE' | string;
}

export const getAllCardinals = async (): Promise<Cardinal[]> => {
  const response = await api.get<ApiResponse<Cardinal[]>>('/api/v1/cardinals');

  return response.data.data;
};

export default getAllCardinals;
