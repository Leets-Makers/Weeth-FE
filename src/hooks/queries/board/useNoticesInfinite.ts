import getNotices from '@/api/board/getNotices';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import BOARD_QUERY_CACHE from '@/constants/boardQueryCache';

const useNoticesInfinite = () => {
  return useInfiniteQuery({
    queryKey: BOARD_QUERY_KEYS.notices.all,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getNotices(pageParam as number, 10);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageNumber + 1;
    },
    ...BOARD_QUERY_CACHE,
  });
};

export default useNoticesInfinite;
