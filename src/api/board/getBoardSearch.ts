import api from '@/api/api';
import {
  EduApiResponse,
  EduSearchContent,
  NoticeApiResponse,
  NoticeSearchContent,
  PartApiResponse,
  PartSearchContent,
} from '@/types/search';

export const getPartSearch = async (
  keyword: string,
  pageNumber: number = 0,
): Promise<PartSearchContent[]> => {
  const response = await api.get<PartApiResponse>(`/api/v1/board/search/part`, {
    params: { keyword, pageNumber, pageSize: 50 },
  });
  return response.data.data?.content ?? [];
};

export const getEduSearch = async (
  keyword: string,
  pageNumber: number = 0,
): Promise<EduSearchContent[]> => {
  const response = await api.get<EduApiResponse>(
    `/api/v1/board/search/education`,
    {
      params: { keyword, pageNumber, pageSize: 50 },
    },
  );
  return response.data.data?.content ?? [];
};

export const getNoticeSearch = async (
  keyword: string,
  pageNumber: number = 0,
): Promise<NoticeSearchContent[]> => {
  const response = await api.get<NoticeApiResponse>(`/api/v1/notices/search`, {
    params: { keyword, pageNumber, pageSize: 50 },
  });
  return response.data.data?.content ?? [];
};
