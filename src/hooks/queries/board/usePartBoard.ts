import getPartBoard from '@/api/board/getPartBoard';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { PartBoardQuery } from '@/types/partBoard';
import { useInfiniteQuery } from '@tanstack/react-query';

const usePartBoard = (query: PartBoardQuery) => {
  return useInfiniteQuery({
    queryKey: BOARD_QUERY_KEYS.partBoard(query),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      getPartBoard({
        ...query,
        pageNumber: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};

export default usePartBoard;
