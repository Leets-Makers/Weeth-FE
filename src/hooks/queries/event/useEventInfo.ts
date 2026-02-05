import getEventInfo, { type EventDetailData } from '@/api/event/getEventInfo';
import { EVENT_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useEventInfo = (type: string | undefined, id: string | undefined) => {
  return useQuery<EventDetailData>({
    queryKey: EVENT_QUERY_KEYS.detail(type, id),
    queryFn: () => getEventInfo(type, id),
    enabled: !!type && !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useEventInfo;
