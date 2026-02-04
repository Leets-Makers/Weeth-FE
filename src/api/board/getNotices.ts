import api from '@/api/api';
import { BoardContent } from '@/types/board';

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

interface NoticesApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: BoardContent[];
    number: number;
    sort: Sort;
    pageable: Pageable;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

export interface GetNoticesResult {
  content: BoardContent[];
  last: boolean;
  pageNumber: number;
}

const getNotices = async (
  pageNumber: number,
  pageSize: number = 10,
): Promise<GetNoticesResult> => {
  const response = await api.get<NoticesApiResponse>(`/api/v1/notices`, {
    params: { pageNumber, pageSize },
  });

  const { data } = response.data;
  return {
    content: data.content,
    last: data.last,
    pageNumber: data.number,
  };
};

export default getNotices;
