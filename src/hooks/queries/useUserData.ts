import { getUserInfo, UserInfo } from '@/api/useGetUserInfo';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useUserData = () => {
  return useQuery<UserInfo>({
    queryKey: USER_QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    retry: 1,
  });
};

export default useUserData;
