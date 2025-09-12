import * as S from '@/styles/attend/PenaltyInfo.styled';
import { SemiBold } from '@/styles/attend/AttendMain.styled';
import theme from '@/styles/theme';
import RightButton from '@/components/Header/RightButton';
import { useNavigate } from 'react-router-dom';

interface PenaltyInfoProps {
  penaltyCount: number;
  warningCount: number;
}

export const MyPenaltyInfo: React.FC<PenaltyInfoProps> = ({
  penaltyCount,
  warningCount,
}) => {
  const navi = useNavigate();
  return (
    <S.PenaltyContainer>
      <S.TopRow>
        <RightButton onClick={() => navi('/penalty')} />
      </S.TopRow>
      <S.BottomRow>
        <SemiBold>
          페널티&nbsp;
          <span style={{ color: theme.color.negative }}>{penaltyCount}회</span>
          {warningCount === 0 ? '' : `, 경고 ${warningCount}회`}
        </SemiBold>
      </S.BottomRow>
    </S.PenaltyContainer>
  );
};

export const PenaltyInfo = () => {
  return (
    <S.PenaltyInfo>페널티 2회 누적 시 동아리 수료가 어려워요.</S.PenaltyInfo>
  );
};
