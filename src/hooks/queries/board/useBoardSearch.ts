import {
  getPartSearch,
  getEduSearch,
  getNoticeSearch,
} from '@/api/board/getBoardSearch';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

type SearchRequestType = 'part' | 'education' | 'notices';

const usePartSearch = (keyword: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEYS.search.part(keyword),
    queryFn: () => getPartSearch(keyword, 0),
    enabled: !!keyword.trim(),
    retry: false,
  });
};

const useEduSearch = (keyword: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEYS.search.education(keyword),
    queryFn: () => getEduSearch(keyword, 0),
    enabled: !!keyword.trim(),
    retry: false,
  });
};

const useNoticeSearch = (keyword: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEYS.search.notice(keyword),
    queryFn: () => getNoticeSearch(keyword, 0),
    enabled: !!keyword.trim(),
    retry: false,
  });
};

export { usePartSearch, useEduSearch, useNoticeSearch };
export type { SearchRequestType };
