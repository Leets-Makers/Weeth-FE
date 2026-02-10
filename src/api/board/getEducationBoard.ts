import api from '@/api/api';
import { GetEduBoardResponse, PartEduBoardQuery } from '@/types/education';

const getEducationBoard = async (
  params: PartEduBoardQuery,
): Promise<GetEduBoardResponse> => {
  const response = await api.get('/api/v1/board/education', {
    params: {
      part: params.part,
      cardinalNumber: params.cardinalNumber,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  });
  return response.data.data;
};

export default getEducationBoard;
