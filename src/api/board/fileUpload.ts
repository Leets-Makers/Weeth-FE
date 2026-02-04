import api from '@/api/api';
import axios from 'axios';

/** presigned URL 요청 */
export const getPresignedUrl = async (file: File, fileName: string) => {
  const encodedName = encodeURIComponent(fileName);
  const res = await api.get(`/files/`, {
    params: { fileName: encodedName },
    data: file,
  });
  return res.data;
};

/** presigned URL로 S3에 파일 업로드 */
export const uploadFileToPresignedUrl = async (url: string, file: File) => {
  return axios.put(url, file);
};

/** 파일 하나를 업로드하고 최종 파일 URL 반환 (query string 제거) */
export const uploadFileAndGetUrl = async (file: File): Promise<string> => {
  const response = await getPresignedUrl(file, file.name);
  const putUrl = response.data[0].putUrl as string;
  const uploadRes = await uploadFileToPresignedUrl(putUrl, file);
  if (uploadRes.status !== 200) {
    throw new Error('파일 업로드에 실패했습니다.');
  }
  return putUrl.split('?')[0];
};
