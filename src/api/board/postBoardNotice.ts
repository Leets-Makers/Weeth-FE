/* eslint-disable no-console */
import { PostRequestType } from '@/types/PostRequestType';
import api from '@/api/api';
import { uploadFileAndGetUrl } from '@/api/board/fileUpload';

interface originFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

// 파일 업로드 후 게시글을 작성하는 함수
export const postBoardNotice = async ({
  originFiles = [],
  files = [],
  postData,
  postType,
  id,
}: {
  originFiles?: originFile[];
  files: File[];
  postData: PostRequestType;
  postType:
    | 'postBoard'
    | 'postNotice'
    | 'postEdu'
    | 'editBoard'
    | 'editNotice'
    | 'editPart'
    | 'editEdu';
  id?: number;
}) => {
  try {
    const fileUrls = await Promise.all(files.map(uploadFileAndGetUrl));

    const updatedPostData = {
      ...postData,
      files: [
        ...originFiles, // 기존 파일 유지
        ...files.map((file, index) => ({
          fileName: file.name,
          fileUrl: fileUrls[index],
        })),
      ],
    };

    let endpoint = '';
    let method: 'post' | 'patch' = 'post';

    switch (postType) {
      case 'postBoard':
        endpoint = `/api/v1/board`;
        method = 'post';
        break;
      case 'postNotice':
        endpoint = `/api/v1/admin/notices`;
        method = 'post';
        break;
      case 'postEdu':
        endpoint = `/api/v1/admin/educations/education`;
        method = 'post';
        break;
      case 'editBoard':
        endpoint = `/api/v1/board/${id}`;
        method = 'patch';
        break;
      case 'editNotice':
        endpoint = `/api/v1/admin/notices/${id}`;
        method = 'patch';
        break;
      case 'editPart':
        endpoint = `/api/v1/board/${id}/part`;
        method = 'patch';
        break;
      case 'editEdu':
        endpoint = `/api/v1/admin/educations/${id}`;
        method = 'patch';
        break;
      default:
        throw new Error('잘못된 postType 입니다.');
    }

    const postRes = await api[method](endpoint, updatedPostData);
    return postRes;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};

export default postBoardNotice;
