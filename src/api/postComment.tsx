import api from '@/api/api';
import axios from 'axios';

// 파일을 업로드할 수 있는 presigned URL을 요청하는 함수
const getPresignedUrl = async (file: File, fileName: string) => {
  const encodedName = encodeURIComponent(fileName);
  const res = await api.get(`/files/`, {
    params: { fileName: encodedName },
    data: file,
  });
  return res.data;
};

// presigned URL로 파일을 업로드하는 함수
const uploadFile = async (url: string, file: File) => {
  const res = await axios.put(url, file);
  return res;
};

// 대댓글일 경우만 parentCommentId 보내주기
const createComment = async (
  postId: number,
  content?: string,
  parentCommentId?: number,
  files: File[] = [],
) => {
  try {
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        const response = await getPresignedUrl(file, file.name);
        // eslint-disable-next-line prefer-destructuring
        const putUrl = response.data[0].putUrl;

        const uploadRes = await uploadFile(putUrl, file);
        if (uploadRes.status !== 200) {
          throw new Error(`파일 업로드에 실패했습니다.`);
        }

        return putUrl.split('?')[0];
      }),
    );
    // 현재 URL의 경로에서 "posts" 또는 "notice" 결정
    const currentPath = window.location.pathname;
    const boardType = currentPath.includes('/notices') ? 'notices' : 'board';

    return api.post(`/api/v1/${boardType}/${postId}/comments`, {
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
