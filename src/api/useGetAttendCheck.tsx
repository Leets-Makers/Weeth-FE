import { useEffect, useState } from 'react';
import api from '@/api/api';
import { ApiResponse, AttendData } from '@/types/attend';

type AttendApiResponse = ApiResponse<AttendData>;

// 출석 조회 정보 받아오는 API
const getAttendCheck = async (): Promise<AttendData> => {
  const response = await api.get<AttendApiResponse>(
    `/api/v1/attendances/detail`,
  );

  return response.data.data;
};

export const useGetAttendCheck = () => {
  const [attendCheckInfo, setAttendCheckInfo] = useState<AttendData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendCheck = async () => {
      try {
        const data = await getAttendCheck();
        setAttendCheckInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '오류가 발생했습니다.');
      }
    };

    fetchAttendCheck();
  }, []);

  return { attendCheckInfo, error };
};

export default useGetAttendCheck;
