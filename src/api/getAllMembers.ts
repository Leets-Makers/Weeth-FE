import api from '@/api/api';
import { ApiResponse, PageResponse } from '@/types';
import { Member } from '@/types/member';

const getAllMembers = async ({
  pageParam = 0,
  cardinal,
}: {
  pageParam?: number;
  cardinal: number | null;
}): Promise<PageResponse<Member>> => {
  const params: Record<string, any> = {
    pageNumber: pageParam,
    pageSize: 10,
  };

  if (cardinal) {
    params.cardinal = cardinal;
  }

  const response = await api.get<ApiResponse<PageResponse<Member>>>(
    '/api/v1/users/all',
    { params },
  );

  return response.data.data;
};

export default getAllMembers;
