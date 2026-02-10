import getAttendCheck from '@/api/getAttendCheck';
import { ATTEND_QUERY_KEYS } from '@/constants/queryKeys';
import { AttendData } from '@/types/attend';
import { useQuery } from '@tanstack/react-query';

const useAttendCheckData = () => {
  return useQuery<AttendData>({
    queryKey: ATTEND_QUERY_KEYS.attendCheck.list,
    queryFn: getAttendCheck,
  });
};

export default useAttendCheckData;
