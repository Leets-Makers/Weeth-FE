import useGetUserInfo from '@/api/useGetUserInfo';
import InfoItem from '@/components/MyPage/InfoItem';
import CardinalTag from '@/components/common/CardinalTag';
import * as S from '@/styles/mypage/Mypage.styled';
import Loading from '../common/Loading';

const MyInfo = () => {
  const { userInfo, loading } = useGetUserInfo();

  if (loading) return <Loading />;
  if (!userInfo)
    return <S.Error>데이터를 불러오는 중 문제가 발생했습니다.</S.Error>;

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
    <S.MyInfoContainer>
      <S.Section>
        <S.Title>개인정보</S.Title>
        <S.Box>
          <InfoItem label="이름">{userInfo.name}</InfoItem>
          <InfoItem label="핸드폰">{userInfo.tel}</InfoItem>
          <InfoItem label="이메일" isLast>
            {userInfo.email}
          </InfoItem>
        </S.Box>
      </S.Section>

      <S.Section>
        <S.Title>활동정보</S.Title>
        <S.Box>
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
        </S.Box>
      </S.Section>
    </S.MyInfoContainer>
  );
};

export default MyInfo;
