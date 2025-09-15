import * as S from '@/styles/attend/AttendMain.styled';
import * as P from '@/styles/attend/AttendRate.styled';
import useGetUserName from '@/hooks/useGetUserName';
import { useNavigate } from 'react-router-dom';
import RightButton from '@/components/Header/RightButton';

const AttendRate: React.FC<{ attendRate: number | undefined }> = ({
  attendRate,
}) => {
  const navi = useNavigate();
  const userName = useGetUserName();

  const displayedRate = attendRate ?? 0;

  return (
    <S.StyledAttend>
      <S.NameContainer>
        <S.SemiBold>
          <P.AttendName>{userName}&nbsp;</P.AttendName>
        </S.SemiBold>
        <P.AttendText>님의 출석률은</P.AttendText>
      </S.NameContainer>
      <P.AttendPercent>
        <P.TitleWrapper>
          <S.SemiBold>
            <div>{displayedRate}%</div>
          </S.SemiBold>
        </P.TitleWrapper>
        <P.RightButtonWrapper>
          <RightButton onClick={() => navi('/attendCheck')} />
        </P.RightButtonWrapper>
      </P.AttendPercent>
      <P.Progress $attendPercent={displayedRate}>
        <P.Dealt $dealt={Math.floor((displayedRate / 100) * 100)} />
      </P.Progress>
    </S.StyledAttend>
  );
};

export default AttendRate;
