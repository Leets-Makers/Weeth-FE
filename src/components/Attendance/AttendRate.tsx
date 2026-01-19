import * as S from '@/styles/attend/AttendMain.styled';
import * as P from '@/styles/attend/AttendRate.styled';

const AttendRate: React.FC<{ attendRate: number }> = ({ attendRate }) => {
  const userName = useGetUserName();

  const displayedRate = attendRate ?? 0;

  return (
    <S.StyledAttend>
      <P.TitleWrapper>
        {userName}님의 <br />
        출석률은 {displayedRate}%
      </P.TitleWrapper>

      <P.Progress $attendPercent={displayedRate}>
        <P.Dealt $dealt={Math.floor((displayedRate / 100) * 100)} />
      </P.Progress>
    </S.StyledAttend>
  );
};

export default AttendRate;
