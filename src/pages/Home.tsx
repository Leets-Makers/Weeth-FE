import HomeMain from '@/components/home/HomeMain';
import HomeFooter from '@/components/home/HomeFooter';
import useCustomBack from '@/hooks/useCustomBack';
import HomeNotice from '@/components/home/HomeNotice';
import HomeInfo from '@/components/home/HomeInfo';
import useGetUserInfo from '@/api/useGetUserInfo';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import Loading from '@/components/common/Loading';
import styled from 'styled-components';
import MobileGNB from '@/components/Navigation/MobileGNB';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Home: React.FC = () => {
  const { userInfo, loading: isLoadingUser } = useGetUserInfo();
  const { recentNotices, recentNoticeLoading } = useGetRecentNotice();
  const { isAdmin, loading } = useGetGlobaluserInfo();

  useCustomBack('/home');

  const smartLoading = useSmartCombinedLoading(
    isLoadingUser,
    recentNoticeLoading,
    loading,
  );
  const isDataReady =
    userInfo &&
    recentNotices &&
    recentNotices.length > 0 &&
    typeof isAdmin === 'boolean';

  if (smartLoading || !isDataReady) return <Loading />;

  return (
    <Container>
      <MobileGNB />
      <HomeNotice
        title={recentNotices?.[0]?.title || ''}
        content={recentNotices?.[0]?.content || ''}
        id={recentNotices?.[0]?.id ?? 0}
      />

      <HomeInfo
        position={userInfo?.position || ''}
        cardinal={userInfo?.cardinals?.length ? userInfo.cardinals[0] : '0'}
        name={userInfo?.name || '...'}
        isAdmin={isAdmin}
      />

      <HomeMain />
      <HomeFooter />
    </Container>
  );
};

export default Home;
