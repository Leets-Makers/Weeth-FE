import useGetUserInfo from '@/api/useGetUserInfo';
import theme from '@/styles/theme';
import styled from 'styled-components';
import InfoItem from '@/components/MyPage/InfoItem';
import CardinalTag from '@/components/common/CardinalTag';
import Loading from '../common/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
`;

const Section = styled.section`
  width: 100%;
  max-width: 370px;
`;

const Title = styled.h2`
  font-family: ${theme.font.semiBold};
  font-size: 20px;
  margin: 20px 0 10px 10px;
`;

const Box = styled.div`
  width: 345px;
  background-color: ${theme.color.gray[18]};
  border: 1px solid ${theme.color.gray[30]};
  border-radius: 14px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  font-family: ${theme.font.semiBold};
`;

const MyInfo = () => {
  const { userInfo, loading } = useGetUserInfo();

  if (loading) return <Loading />;
  if (!userInfo)
    return <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>;

  const getPositionLabel = (pos: string) => {
    switch (pos) {
      case 'FE':
        return '프론트엔드';
      case 'BE':
        return '백엔드';
      case 'D':
        return '디자인';
      case 'PM':
        return 'PM';
      default:
        return '';
    }
  };

  return (
    <Container>
      <Section>
        <Title>개인정보</Title>
        <Box>
          <InfoItem label="이름">{userInfo.name}</InfoItem>
          <InfoItem label="핸드폰">{userInfo.tel}</InfoItem>
          <InfoItem label="이메일" isLast>
            {userInfo.email}
          </InfoItem>
        </Box>
      </Section>

      <Section>
        <Title>활동정보</Title>
        <Box>
          <InfoItem label="학과">{userInfo.department}</InfoItem>
          <InfoItem label="학번">{userInfo.studentId}</InfoItem>
          <InfoItem label="기수">
            {userInfo.cardinals.map((cardinal) => (
              <CardinalTag key={cardinal} type="mypage" cardinal={cardinal} />
            ))}
          </InfoItem>
          <InfoItem label="역할" isLast readOnly>
            {getPositionLabel(userInfo.position)}
          </InfoItem>
        </Box>
      </Section>
    </Container>
  );
};

export default MyInfo;
