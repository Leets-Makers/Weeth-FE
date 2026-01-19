import getPenalty from '@/api/getPenalty';
import { ATTEND_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const usePenaltyData = () => {
  return useQuery({
    queryKey: ATTEND_QUERY_KEYS.penalty.list,
    queryFn: getPenalty,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    retry: 1,
  });
};

export default usePenaltyData;
