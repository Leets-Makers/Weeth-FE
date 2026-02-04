import deleteComment from '@/api/board/deleteComment';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useMutationCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface DeleteCommentParams {
  path: string;
  postId: number;
  commentId: number;
}

const useDeleteComment = (callbacks?: useMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ path, postId, commentId }: DeleteCommentParams) =>
      deleteComment(path, postId, commentId),
    onMutate: () => {
      callbacks?.onMutate?.();
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: BOARD_QUERY_KEYS.detail(variables.path, variables.postId),
      });
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      let message = '댓글 삭제에 실패했습니다.';
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

export default useDeleteComment;
