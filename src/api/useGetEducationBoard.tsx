import { useInfiniteQuery } from '@tanstack/react-query';
import api from './api';

type Part = 'ALL' | 'FE' | 'BE' | 'D' | 'PM';

interface PartEduBoardQuery {
  part: Part;
  cardinalNumber: number | undefined;
  pageNumber: number;
  pageSize: number;
}

export interface PartEduContent {
  id: number;
  name: string;
  parts: Part[];
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

interface GetEduBoardResponse {
  size: number;
  content: PartEduContent[];
  number: number;
  sort: PartBoardSort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

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
