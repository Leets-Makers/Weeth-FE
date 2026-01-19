import patchAttend from '@/api/patchAttend';
import { ATTEND_QUERY_KEYS } from '@/constants/queryKeys';
import { useMutationCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const usePatchAttend = (callbacks?: useMutationCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchAttend,
    onMutate: async () => {
      callbacks?.onMutate?.();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ATTEND_QUERY_KEYS.attend.me,
      });

      await queryClient.invalidateQueries({
        queryKey: ATTEND_QUERY_KEYS.penalty.me,
      });
    },

    onError: (error) => {
      let message = '출석 처리에 실패했습니다.';

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      callbacks?.onError?.(message);
    },

    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};

export default usePatchAttend;
