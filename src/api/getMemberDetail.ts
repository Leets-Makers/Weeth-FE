import api from '@/api/api';
import { ApiResponse } from '@/types';
import { MemberDetail } from '@/types/member';

export const getMemberDetail = async (
  userId: number,
): Promise<MemberDetail> => {
  const response = await api.get<ApiResponse<MemberDetail>>(
    `/api/v1/users/details`,
    {
      params: { userId },
    },
  );

  return response.data.data;
};

export default getMemberDetail;
