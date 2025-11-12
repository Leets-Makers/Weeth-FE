import { TitleText, InfoText } from '@/styles/attend/AttendMain.styled';
import { colors } from '@/theme/designTokens';

interface PenaltyInfoProps {
  penaltyCount: number;
  warningCount: number;
}

export const MyPenaltyInfo: React.FC<PenaltyInfoProps> = ({
  penaltyCount,
  warningCount,
}) => {
  return (
    <TitleText>
      페널티&nbsp;
      <span style={{ color: colors.semantic.state.error }}>
        {penaltyCount}회
      </span>
      {warningCount === 0 ? '' : `, 경고 ${warningCount}회`}
    </TitleText>
  );
};

export const PenaltyInfo = () => {
  return <InfoText>페널티 2회 누적 시 동아리 수료가 어려워요.</InfoText>;
};
