import useUserData from '@/hooks/queries/useUserData';

const useGetRole = () => {
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';
  return isAdmin;
};

export default useGetRole;
