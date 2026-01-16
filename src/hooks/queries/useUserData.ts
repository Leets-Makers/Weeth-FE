import { getUserInfo, UserInfo } from '@/api/useGetUserInfo';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useUserData = () => {
  return useQuery<UserInfo>({
    queryKey: USER_QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh
    gcTime: 1000 * 60 * 10, // 10분 캐시 유지

    retry: 1,
  });
};

export default useUserData;
