import api from '@/api/api';
import { uploadFileAndGetUrl } from '@/api/board/fileUpload';

const createComment = async (
  postId: number,
  boardType: 'notices' | 'board',
  content?: string,
  parentCommentId?: number,
  files: File[] = [],
) => {
  try {
    const fileUrls = await Promise.all(files.map(uploadFileAndGetUrl));
    const path = boardType;

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
