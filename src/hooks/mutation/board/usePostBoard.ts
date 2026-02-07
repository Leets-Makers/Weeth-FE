import postBoardNotice from '@/api/board/postBoardNotice';
import { useMutationCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface OriginFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

interface PostBoardParams {
  originFiles?: OriginFile[];
  files: File[];
  postData: import('@/types/PostRequestType').PostRequestType;
  postType:
    | 'postBoard'
    | 'postNotice'
    | 'postEdu'
    | 'editBoard'
    | 'editNotice'
    | 'editPart'
    | 'editEdu';
  id?: number;
}

const usePostBoard = (callbacks?: useMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostBoardParams) => postBoardNotice(params),
    onMutate: () => {
      callbacks?.onMutate?.();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      let message = '게시글 작성에 실패했습니다.';
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

export default usePostBoard;
