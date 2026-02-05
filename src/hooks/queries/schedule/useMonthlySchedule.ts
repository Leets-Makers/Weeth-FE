import getMonthlySchedule, {
  type ScheduleEvent,
} from '@/api/schedule/getMonthlySchedule';
import { SCHEDULE_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useMonthlySchedule = (start: string, end: string) => {
  return useQuery<ScheduleEvent[]>({
    queryKey: SCHEDULE_QUERY_KEYS.monthly(start, end),
    queryFn: () => getMonthlySchedule(start, end),
    enabled: !!start && !!end,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useMonthlySchedule;
