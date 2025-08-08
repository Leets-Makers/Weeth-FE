import { useInfiniteQuery } from '@tanstack/react-query';
import api from './api';

interface PartBoardQuery {
  part: string;
  category: string;
  cardinalNumber?: number;
  week?: number;
  studyName?: string;
  pageNumber: number;
  pageSize: number;
}

interface PartBoardContent {
  id: number;
  name: string;
  position: string;
  role: string;
  title: string;
  content: string;
  studyName: string;
  week: number;
  time: string;
  commentCount: number;
  hasFile: boolean;
  isNew: boolean;
}

interface PartBoardSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  offset: number;
  sort: PartBoardSort;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

interface GetPartBoardResponse {
  size: number;
  content: PartBoardContent[];
  sort: PartBoardSort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

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
