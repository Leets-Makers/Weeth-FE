import getMemberDetail from '@/api/getMemberDetail';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import { MemberDetail } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

const useMemberDetailData = (memberId: number) => {
  return useQuery<MemberDetail>({
    queryKey: USER_QUERY_KEYS.member.byId(memberId),
    queryFn: () => getMemberDetail(memberId as number),
    enabled: typeof memberId === 'number',
  });
};

export default useMemberDetailData;
