import getEducationBoard from '@/api/board/getEducationBoard';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { PartEduBoardQuery } from '@/types/education';
import { useInfiniteQuery } from '@tanstack/react-query';

const useEducationBoard = (query: PartEduBoardQuery) => {
  return useInfiniteQuery({
    queryKey: BOARD_QUERY_KEYS.educationBoard(query),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      getEducationBoard({
        ...query,
        pageNumber: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};

export default useEducationBoard;
