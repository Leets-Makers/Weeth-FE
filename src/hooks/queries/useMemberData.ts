import { useInfiniteQuery } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import getAllMembers from '@/api/getAllMembers';

const useMemberData = (cardinal: number) => {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEYS.member.list(cardinal),

    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getAllMembers({
        pageParam: pageParam ?? 0,
        cardinal,
      }),

    getNextPageParam: (lastPage: { last: boolean; pageNumber: number }) => {
      // lastPage.last === true면 더 없음
      if (lastPage.last) return undefined;
      return lastPage.pageNumber + 1;
    },

    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
};

export default useMemberData;
