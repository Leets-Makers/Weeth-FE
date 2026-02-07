import api from '@/api/api';

export interface BoardDetailComment {
  id: number;
  name: string;
  content: string;
  time: string;
  position: string;
  role: string;
  children?: BoardDetailComment[];
  fileUrls?: { fileId: number; fileName: string; fileUrl: string }[];
}

export interface BoardDetailFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

export interface BoardDetailResponse {
  id: number;
  name: string;
  position: string;
  role: string;
  title: string;
  content: string;
  studyName: string | null;
  week: number;
  cardinalNumber: number;
  part: string;
  parts: string[];
  time: string;
  commentCount: number;
  comments: BoardDetailComment[];
  fileUrls: BoardDetailFile[];
}

const getBoardDetail = async (
  path: string,
  id: number,
): Promise<BoardDetailResponse> => {
  const response = await api.get(`/api/v1/${path}/${id}`, {});
  const { data } = response.data;

  const formattedComments = (data.comments ?? []).map((comment: any) => ({
    ...comment,
    children: comment.children ?? [],
  }));

  return {
    ...data,
    comments: formattedComments,
  };
};

export default getBoardDetail;
