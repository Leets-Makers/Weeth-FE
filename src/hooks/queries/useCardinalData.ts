import getAllCardinals, { Cardinal } from '@/api/getCardinals';
import { CARDINAL_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useCardinalData = () => {
  return useQuery<Cardinal[]>({
    queryKey: CARDINAL_QUERY_KEYS.cardinal.list,
    queryFn: getAllCardinals,
    staleTime: 1000 * 60 * 60,
  });
};

export default useCardinalData;
