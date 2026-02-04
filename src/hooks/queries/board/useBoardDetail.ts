import getBoardDetail from '@/api/board/getBoardDetail';
import type { BoardDetailResponse } from '@/api/board/getBoardDetail';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import BOARD_QUERY_CACHE from '@/constants/boardQueryCache';

const useBoardDetail = (path: string, id: number, enabled = true) => {
  return useQuery<BoardDetailResponse>({
    queryKey: BOARD_QUERY_KEYS.detail(path, id),
    queryFn: () => getBoardDetail(path, id),
    enabled: enabled && !!id,
    retry: 1,
    ...BOARD_QUERY_CACHE,
  });
};

export default useBoardDetail;
