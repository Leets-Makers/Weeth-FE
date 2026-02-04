import createComment from '@/api/board/postComment';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useMutationCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface PostCommentParams {
  postId: number;
  content?: string;
  parentCommentId?: number;
  files?: File[];
  boardPath: string;
}

const usePostComment = (callbacks?: useMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      content,
      parentCommentId,
      files = [],
      boardPath,
    }: PostCommentParams) =>
      createComment(
        postId,
        boardPath as 'notices' | 'board',
        content,
        parentCommentId,
        files,
      ),
    onMutate: () => {
      callbacks?.onMutate?.();
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: BOARD_QUERY_KEYS.detail(
          variables.boardPath,
          variables.postId,
        ),
      });
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      let message = '댓글 작성에 실패했습니다.';
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

export default usePostComment;
