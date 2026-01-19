import api from '@/api/api';

const getAllMembers = async ({
  pageParam = 0,
  cardinal,
}: {
  pageParam?: number;
  cardinal: number;
}) => {
  const params: Record<string, any> = {
    pageNumber: pageParam,
    pageSize: 10,
  };

  if (cardinal) {
    params.cardinal = cardinal;
  }

  const response = await api.get('/api/v1/users/all', { params });
  return response.data.data.content;
};

export default getAllMembers;
