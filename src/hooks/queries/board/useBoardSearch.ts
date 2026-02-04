import {
  getPartSearch,
  getEduSearch,
  getNoticeSearch,
} from '@/api/board/getBoardSearch';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import BOARD_QUERY_CACHE from '@/constants/boardQueryCache';

type SearchRequestType = 'part' | 'education' | 'notices';

const usePartSearch = (keyword: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEYS.search.part(keyword),
    queryFn: () => getPartSearch(keyword, 0),
    enabled: !!keyword.trim(),
    retry: false,
    ...BOARD_QUERY_CACHE,
  });
};

const useEduSearch = (keyword: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEYS.search.education(keyword),
    queryFn: () => getEduSearch(keyword, 0),
    enabled: !!keyword.trim(),
    retry: false,
    ...BOARD_QUERY_CACHE,
  });
};

const useNoticeSearch = (keyword: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEYS.search.notice(keyword),
    queryFn: () => getNoticeSearch(keyword, 0),
    enabled: !!keyword.trim(),
    retry: false,
    ...BOARD_QUERY_CACHE,
  });
};

export { usePartSearch, useEduSearch, useNoticeSearch };
export type { SearchRequestType };
