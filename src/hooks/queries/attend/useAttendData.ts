import getAttendInfo from '@/api/getAttendInfo';
import { ATTEND_QUERY_KEYS } from '@/constants/queryKeys';
import { AttendInfo } from '@/types/attend';
import { useQuery } from '@tanstack/react-query';

const useAttendData = () => {
  return useQuery<AttendInfo>({
    queryKey: ATTEND_QUERY_KEYS.attend.me,
    queryFn: getAttendInfo,
    staleTime: Infinity,

    retry: 1,
  });
};

export default useAttendData;
