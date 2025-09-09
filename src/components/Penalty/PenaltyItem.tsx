import { Penalty } from '@/api/useGetPenalty';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/penalty/PenaltyItem.styled';

const PenaltyItem: React.FC<Penalty> = ({
  penaltyType,
  penaltyDescription,
  time,
}) => {
  const badgeType = penaltyType === 'PENALTY';
  return (
    <div>
      <S.Container>
        <S.PenaltyBedge $type={badgeType}>
          {badgeType ? '페널티' : '경고'}
        </S.PenaltyBedge>
        <S.ContentText>{penaltyDescription}</S.ContentText>
        <S.DateText>{formatDate(time)}</S.DateText>
      </S.Container>
      <S.PaddingDiv>
        <S.Line />
      </S.PaddingDiv>
    </div>
  );
};

export default PenaltyItem;
