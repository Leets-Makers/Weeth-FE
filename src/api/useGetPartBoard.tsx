import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/api/api';
import { GetPartBoardResponse, PartBoardQuery } from '@/types/partBoard';

const fetchPartBoard = async (
  params: PartBoardQuery,
): Promise<GetPartBoardResponse> => {
  const response = await api.get('/api/v1/board/part', {
    params: {
      part: params.part,
      category: params.category,
      cardinalNumber: params.cardinalNumber,
      week: params.week,
      studyName: params.studyName,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  });
  return response.data.data;
};

const useGetPartBoard = (query: PartBoardQuery) => {
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

export default useGetPartBoard;
