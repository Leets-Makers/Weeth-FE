import HomeMain from '@/components/home/HomeMain';
import HomeFooter from '@/components/home/HomeFooter';
import useCustomBack from '@/hooks/useCustomBack';
import HomeNotice from '@/components/home/HomeNotice';
import HomeInfo from '@/components/home/HomeInfo';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import styled from 'styled-components';
import useUserData from '@/hooks/queries/useUserData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Home: React.FC = () => {
  const { data: userInfo } = useUserData();
  const { recentNotices } = useGetRecentNotice();

  useCustomBack('/home');

  return (
    <Container>
      <HomeNotice
        title={recentNotices?.[0]?.title || ''}
        content={recentNotices?.[0]?.content || ''}
        id={recentNotices?.[0]?.id ?? 0}
      />

      <HomeInfo
        position={userInfo?.position || 'FE'}
        cardinal={userInfo?.cardinals[0] || 0}
        name={userInfo?.name || '...'}
        isAdmin={userInfo?.role === 'ADMIN' || false}
      />

      <HomeMain />
      <HomeFooter />
    </Container>
  );
};

export default Home;
