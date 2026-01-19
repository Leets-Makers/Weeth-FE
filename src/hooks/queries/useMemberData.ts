import { useInfiniteQuery } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import getAllMembers from '@/api/getAllMembers';

const useAllMemberData = (cardinal: number | null) => {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEYS.member.list(cardinal),

    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getAllMembers({
        pageParam: pageParam ?? 0,
        cardinal,
      });
      return {
        last: response.last,
        pageNumber: response.number,
        content: response.content,
      };
    },

    getNextPageParam: (lastPage: { last: boolean; pageNumber: number }) => {
      // lastPage.last === true면 더 없음
      if (lastPage.last) return undefined;
      return lastPage.pageNumber + 1;
    },

    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
};

export default useAllMemberData;
