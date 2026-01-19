import getAttendInfo from '@/api/getAttendInfo';
import { ATTEND_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useAttendData = () => {
  return useQuery({
    queryKey: ATTEND_QUERY_KEYS.attend.me,
    queryFn: getAttendInfo,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    retry: 1,
  });
};

export default useAttendData;
