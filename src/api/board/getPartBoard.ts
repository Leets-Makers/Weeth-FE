import api from '@/api/api';
import { GetPartBoardResponse, PartBoardQuery } from '@/types/partBoard';

const getPartBoard = async (
  params: PartBoardQuery,
): Promise<GetPartBoardResponse> => {
  const response = await api.get('/api/v1/board/part', {
    params: {
      part: params.part,
      category: params.category,
      cardinalNumber: params.cardinalNumber,
      week: params.week,
      studyName: params.studyName,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  });
  return response.data.data;
};

export default getPartBoard;
