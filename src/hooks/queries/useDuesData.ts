import getDues from '@/api/getDues';

import { DUES_QUERY_KEYS } from '@/constants/queryKeys';
import { DuesInfo } from '@/types/dues';
import { useQuery } from '@tanstack/react-query';

const useDuesData = (cardinal: number) => {
  return useQuery<DuesInfo>({
    queryKey: DUES_QUERY_KEYS.dues.byCardinal(cardinal),
    queryFn: () => getDues(cardinal),
    enabled: cardinal !== 0,
  });
};

export default useDuesData;
