import HomeMain from '@/components/home/HomeMain';
import HomeFooter from '@/components/home/HomeFooter';
import useCustomBack from '@/hooks/useCustomBack';
import HomeNotice from '@/components/home/HomeNotice';
import HomeInfo from '@/components/home/HomeInfo';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';

import useUserData from '@/hooks/queries/useUserData';
import { ResponsiveContainer } from '@/styles';

const Home: React.FC = () => {
  const { data: userInfo } = useUserData();
  const { recentNotices } = useGetRecentNotice();

  useCustomBack('/home');

  return (
    <ResponsiveContainer>
      <HomeNotice
        title={recentNotices?.[0]?.title || ''}
        content={recentNotices?.[0]?.content || ''}
        id={recentNotices?.[0]?.id ?? 0}
      />

      <HomeInfo
        position={userInfo?.position || 'FE'}
        name={userInfo?.name || '...'}
        isAdmin={userInfo?.role === 'ADMIN' || false}
      />

      <HomeMain />
      <HomeFooter />
    </ResponsiveContainer>
  );
};

export default Home;
