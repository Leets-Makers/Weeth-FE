import { useEffect, useCallback } from 'react';
import { getPenaltyApi } from '@/api/admin/penalty/penalty.api';
import {
  PenaltyAction,
  PenaltyState,
} from '@/components/Admin/context/PenaltyReducer';

interface UsePenaltyDataProps {
  selectedCardinal: number | null;
  isAdmin?: boolean;
  loading?: boolean;
  dispatch: React.Dispatch<PenaltyAction>;
}

export const usePenaltyData = ({
  selectedCardinal,
  isAdmin,
  loading,
  dispatch,
}: UsePenaltyDataProps) => {
  const fetchPenaltyData = useCallback(async () => {
    try {
      if (loading || isAdmin === undefined || !isAdmin) return;

      const resp = await getPenaltyApi(selectedCardinal ?? 0);

      if (resp.code === 200 || resp.code === 0) {
        const data = resp.data;

        const groups = Array.isArray(data) ? data : data ? [data] : [];
        const users = groups.flatMap((g: any) => g?.responses ?? []);

        const penalties = users.reduce((acc: PenaltyState, u: any) => {
          const list = Array.isArray(u?.Penalties) ? u.Penalties : [];
          acc[u.userId] = list.map((p: any) => {
            const isAuto = p.penaltyType === 'AUTO_PENALTY';
            return {
              penaltyId: p.penaltyId,
              penaltyType: isAuto ? 'PENALTY' : p.penaltyType,
              penaltyDescription: p.penaltyDescription,
              time: p.time,
              isAuto,
            };
          });
          return acc;
        }, {} as PenaltyState);

        dispatch({ type: 'SET_PENALTY', payload: penalties });
      }
    } catch (e: any) {
      console.error('페널티 조회 오류:', e.message);
    }
  }, [selectedCardinal, isAdmin, loading, dispatch]);

  useEffect(() => {
    fetchPenaltyData();
  }, [fetchPenaltyData]);

  return { fetchPenaltyData };
};
