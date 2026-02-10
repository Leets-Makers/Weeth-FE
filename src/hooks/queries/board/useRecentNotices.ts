import getNotices from '@/api/board/getNotices';
import { BoardContent } from '@/types/board';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import BOARD_QUERY_CACHE from '@/constants/boardQueryCache';

const useRecentNotices = () => {
  return useQuery<BoardContent[]>({
    queryKey: BOARD_QUERY_KEYS.notices.recent,
    queryFn: async () => {
      const result = await getNotices(0, 10);
      return result.content;
    },
    ...BOARD_QUERY_CACHE,
  });
};

export default useRecentNotices;
