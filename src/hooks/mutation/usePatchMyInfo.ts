import patchMyInfo from '@/api/patchMyInfo';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import { useMutationCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchMyInfo = (callbacks?: useMutationCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchMyInfo,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.user.all,
      });

      callbacks?.onSuccess?.();
    },
  });
};

export default usePatchMyInfo;
