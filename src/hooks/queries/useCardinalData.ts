import getAllCardinals, { Cardinal } from '@/api/getCardinals';
import { CARDINAL_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const useCardinalData = () => {
  const query = useQuery<Cardinal[]>({
    queryKey: CARDINAL_QUERY_KEYS.cardinal.list,
    queryFn: getAllCardinals,
  });

  const currentCardinal = useMemo(() => {
    if (!query.data) return null;
    return (
      query.data.find((c) => c.status === 'IN_PROGRESS')?.cardinalNumber ?? null
    );
  }, [query.data]);

  return {
    ...query,
    currentCardinal,
  };
};

export default useCardinalData;
