import api from './api';

export type RealPart = 'ALL' | 'FE' | 'BE' | 'D' | 'PM';

type ApiResponse = {
  code: number;
  message: string;
  data?: { studyNames?: string[] };
};

const getStudyLists = async (part: RealPart): Promise<string[]> => {
  const res = await api.get<ApiResponse>('/api/v1/board/part/studies', {
    params: { part },
  });

  return res.data.data?.studyNames ?? [];
};

export default getStudyLists;
