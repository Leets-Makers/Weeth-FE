import getYearlySchedule, {
  type YearlyScheduleData,
} from '@/api/schedule/getYearlySchedule';
import { SCHEDULE_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useYearlySchedule = (year: number, semester: number) => {
  return useQuery<YearlyScheduleData>({
    queryKey: SCHEDULE_QUERY_KEYS.yearly(year, semester),
    queryFn: () => getYearlySchedule(year, semester),
    enabled: !!year && !!semester,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useYearlySchedule;
