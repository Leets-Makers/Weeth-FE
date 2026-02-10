import api from '@/api/api';
import { ApiResponse } from '@/types';
import { DuesInfo } from '@/types/dues';

const getDues = async (paramsCardinal: number | null): Promise<DuesInfo> => {
  const response = await api.get<ApiResponse<DuesInfo>>(
    `/api/v1/account/${paramsCardinal}`,
  );
  return response.data.data;
};

export default getDues;
