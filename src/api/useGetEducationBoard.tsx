import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/api/api';
import { GetEduBoardResponse, PartEduBoardQuery } from '@/types/education';

const fetchPartBoard = async (
  params: PartEduBoardQuery,
): Promise<GetEduBoardResponse> => {
  const response = await api.get('/api/v1/board/education', {
    params: {
      part: params.part,
      cardinalNumber: params.cardinalNumber,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  });
  return response.data.data;
};

const useGetEducationBoard = (query: PartEduBoardQuery) => {
  return useInfiniteQuery({
    queryKey: ['partBoard', query],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      fetchPartBoard({
        ...query,
        pageNumber: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};

export default useGetEducationBoard;
