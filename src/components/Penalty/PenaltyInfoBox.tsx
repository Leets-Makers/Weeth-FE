import * as S from '@/styles/penalty/PenaltyInfoBox.styled';

export interface PenaltyInfoBoxProps {
  penaltyCount: number;
  warningCount: number;
}

const PenaltyInfoBox: React.FC<PenaltyInfoBoxProps> = ({
  penaltyCount,
  warningCount,
}) => {
  return (
    <S.Container>
      <S.Separator />

      <S.LeftGroup>
        <S.InfoText>페널티</S.InfoText>
        <S.CountText>{penaltyCount}회</S.CountText>
      </S.LeftGroup>

      <S.RightGroup>
        <S.InfoText>경고</S.InfoText>
        <S.CountText>{warningCount}회</S.CountText>
      </S.RightGroup>
    </S.Container>
  );
};

export default PenaltyInfoBox;
