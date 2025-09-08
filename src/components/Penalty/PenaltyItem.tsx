import { Penalty } from '@/api/useGetPenalty';
import formatDate from '@/hooks/formatDate';
import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const PenaltyBedge = styled.div<{ $type?: boolean }>`
  max-width: 52px;
  padding: 3px 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  background-color: ${({ $type }) => ($type ? '#FF585840' : '#FFB20040')};
  color: ${({ $type }) => ($type ? theme.color.negative : theme.color.caution)};
`;
const ContentText = styled.text`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
  line-height: 1;
  margin-top: 10px;
`;

const DateText = styled.text`
  color: #ffffff66;
  font-family: ${theme.font.regular};
  margin-top: 15px;
  font-size: 12px;
  line-height: 1;
`;
const PaddingDiv = styled.div`
  padding: 0 5px;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.gray[18]};
`;
const PenaltyItem: React.FC<Penalty> = ({
  penaltyType,
  penaltyDescription,
  time,
}) => {
  const badgeType = penaltyType === 'PENALTY';
  return (
    <div>
      <Container>
        <PenaltyBedge $type={badgeType}>
          {badgeType ? '페널티' : '경고'}
        </PenaltyBedge>
        <ContentText>{penaltyDescription}</ContentText>
        <DateText>{formatDate(time)}</DateText>
      </Container>
      <PaddingDiv>
        <Line />
      </PaddingDiv>
    </div>
  );
};

export default PenaltyItem;
