import * as S from '@/styles/attend/AttendMain.styled';
import theme from '@/styles/theme';
import RightButton from '@/components/Header/RightButton';
import { useNavigate } from 'react-router-dom';

interface PenaltyInfoProps {
  penaltyCount: number | undefined;
}

export const MyPenaltyInfo: React.FC<PenaltyInfoProps> = ({ penaltyCount }) => {
  const navi = useNavigate();
  return (
    <S.PenaltyContainer>
      <S.ButtonContainer>
        <S.SemiBold>
          페널티&nbsp;
          <div style={{ color: theme.color.negative }}>{penaltyCount}회</div>
        </S.SemiBold>
        <RightButton onClick={() => navi('/penalty')} />
      </S.ButtonContainer>
      <S.PenaltyCount>
        페널티가 {penaltyCount}회 적립이 되었어요.
        <br />
        어떤 이유인지 알아볼까요?
      </S.PenaltyCount>
    </S.PenaltyContainer>
  );
};

export const PenaltyInfo = () => {
  return (
    <S.PenaltyInfo>페널티 2회 누적 시 동아리 수료가 어려워요.</S.PenaltyInfo>
  );
};
