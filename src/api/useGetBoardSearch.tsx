import { BoardContent } from '@/pages/Board';
import api from './api';

interface ApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: BoardContent[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

const BASE_URL = import.meta.env.VITE_API_URL;

const useGetBoardSearch = async (
  keyword: string,
  pageNumber: number,
  appendPosts: (newPosts: BoardContent[]) => void,
) => {
  try {
    const response = await api.get<ApiResponse>(
      `${BASE_URL}/api/v1/board/search`,
      {
        params: { keyword, pageNumber, pageSize: 50 },
      },
    );

    const { data } = response.data;
    appendPosts(data.content);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default useGetBoardSearch;
