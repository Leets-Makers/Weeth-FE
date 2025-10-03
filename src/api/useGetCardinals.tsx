import { useEffect, useMemo, useState } from 'react';
import api from '@/api/api';

export const getAllCardinals = async () => {
  return api.get(`/api/v1/cardinals`);
};

export const useGetAllCardinals = () => {
  const [allCardinals, setAllCardinals] = useState<
    {
      status: string;
      id: number;
      cardinalNumber: number;
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);

      try {
        const response = await getAllCardinals();
        setAllCardinals(response.data.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '데이터를 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

    fetchUsers();
  }, []);

  const currentCardinal = useMemo<number | null>(() => {
    const cur = allCardinals.find((c) => c.status === 'IN_PROGRESS');
    return cur?.cardinalNumber ?? null;
  }, [allCardinals]);
  return { allCardinals, currentCardinal, error };
};

export default useGetAllCardinals;
