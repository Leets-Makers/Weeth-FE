import getStudyList from '@/api/board/getStudyList';
import type { RealPart } from '@/api/board/getStudyList';
import { BOARD_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useStudyList = (part: RealPart) => {
  return useQuery<string[]>({
    queryKey: BOARD_QUERY_KEYS.studyList(part),
    queryFn: () => getStudyList(part),
    enabled: !!part,
  });
};

export default useStudyList;
