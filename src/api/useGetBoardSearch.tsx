import { toastError } from '@/components/common/ToastMessage';
import {
  EduApiResponse,
  EduSearchContent,
  NoticeApiResponse,
  NoticeSearchContent,
  PartApiResponse,
  PartSearchContent,
} from '@/types/search';
import api from './api';

const BASE_URL = import.meta.env.VITE_API_URL;

export const useGetPartSearch = async (
  keyword: string,
  pageNumber: number,
  appendPosts: (newPosts: PartSearchContent[]) => void,
) => {
  try {
    const response = await api.get<PartApiResponse>(
      `${BASE_URL}/api/v1/board/search/part`,
      {
        params: { keyword, pageNumber, pageSize: 50 },
      },
    );

    const { data } = response.data;
    appendPosts(data.content);
  } catch (error) {
    toastError('검색된 내용이 없습니다.');
    appendPosts([]);
    console.error('Error fetching data:', error);
  }
};

export const useGetEduSearch = async (
  keyword: string,
  pageNumber: number,
  appendPosts: (newPosts: EduSearchContent[]) => void,
) => {
  try {
    const response = await api.get<EduApiResponse>(
      `${BASE_URL}/api/v1/board/search/education`,
      {
        params: { keyword, pageNumber, pageSize: 50 },
      },
    );

    const { data } = response.data;
    appendPosts(data.content);
  } catch (error) {
    toastError('검색된 내용이 없습니다.');
    appendPosts([]);
    console.error('Error fetching data:', error);
  }
};

export const useGetNoticeSearch = async (
  keyword: string,
  pageNumber: number,
  appendPosts: (newPosts: NoticeSearchContent[]) => void,
) => {
  try {
    const response = await api.get<NoticeApiResponse>(
      `${BASE_URL}/api/v1/notices/search`,
      {
        params: { keyword, pageNumber, pageSize: 50 },
      },
    );

    const { data } = response.data;
    appendPosts(data.content);
  } catch (error) {
    toastError('검색된 내용이 없습니다.');
    appendPosts([]);
    console.error('Error fetching data:', error);
  }
};
