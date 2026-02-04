import api from '@/api/api';
import { uploadFileAndGetUrl } from '@/api/board/fileUpload';

// 대댓글일 경우만 parentCommentId 보내주기
// boardType: 'notices' | 'board' (미전달 시 URL 경로로 판단)
const createComment = async (
  postId: number,
  content?: string,
  parentCommentId?: number,
  boardType?: 'notices' | 'board',
  files: File[] = [],
) => {
  try {
    const fileUrls = await Promise.all(files.map(uploadFileAndGetUrl));
    const path =
      boardType ??
      (window.location.pathname.includes('/notices') ? 'notices' : 'board');

    return api.post(`/api/v1/${path}/${postId}/comments`, {
      parentCommentId,
      content,
      files: [
        ...files.map((file, index) => ({
          fileName: file.name,
          fileUrl: fileUrls[index],
        })),
      ],
    });
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};

export default createComment;
