import { useEffect, useState } from 'react';
import api from '@/api/api';
import { AttendInfo } from '@/types/attend';

// 출석 정보 받아오는 API
const getAttend = async () => {
  return api.get(`/api/v1/attendances`);
};

export const useGetAttend = () => {
  const [attendInfo, setAttendInfo] = useState<AttendInfo | null>(null);
  const [hasSchedule, setHasSchedule] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttend = async () => {
    setIsLoading(true);
    try {
      const response = await getAttend();
      const { data } = response.data;
      setAttendInfo(data);
      setError(null);

      if (data.title && data.start) {
        setHasSchedule(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttend();
  }, []);

  return { attendInfo, hasSchedule, isLoading, error, refetch: fetchAttend };
};

export default useGetAttend;
