import deletePost from '@/api/board/deletePost';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useMutationCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface DeletePostParams {
  postId: number;
  path: string;
}

const useDeletePost = (callbacks?: useMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, path }: DeletePostParams) =>
      deletePost(postId, path),
    onMutate: () => {
      callbacks?.onMutate?.();
    },
    onSuccess: async (_, variables) => {
      if (variables.path === 'notices') {
        await queryClient.invalidateQueries({
          queryKey: BOARD_QUERY_KEYS.notices.all,
        });
        await queryClient.invalidateQueries({
          queryKey: BOARD_QUERY_KEYS.notices.recent,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['board', 'part'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['board', 'education'],
        });
      }
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      let message = '게시글 삭제에 실패했습니다.';
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

export default useDeletePost;
