import { useEffect, useState } from 'react';
import api from '@/api/api';

interface Comments {
  id: number;
  name: string;
  content: string;
  time: string;
  position: string;
  role: string;
}

interface FileUrls {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

interface BoardDetail {
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
  comments: Comments[];
  fileUrls: FileUrls[];
}

const getBoardDetail = async (path: string, id: number) => {
  return api.get(`/api/v1/${path}/${id}`, {});
};

export const useGetBoardDetail = (
  part: string,
  id: number,
  refreshKey?: number,
) => {
  const [boardDetailInfo, setBoardDetail] = useState<BoardDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const type = part === 'notices' ? 'notices' : 'board';

  useEffect(() => {
    const fetchBoardDetail = async () => {
      setLoading(true);
      try {
        const response = await getBoardDetail(type, id);
        const { data } = response.data;

        // children이 undefined면 빈 배열로 변환
        const formattedComments = data.comments.map((comment: any) => ({
          ...comment,
          children: comment.children ?? [],
        }));

        setBoardDetail({
          ...data,
          comments: formattedComments,
        });
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardDetail();
  }, [part, id, refreshKey]);

  return { boardDetailInfo, error, loading };
};

export default useGetBoardDetail;
