import { Line } from '@/styles/board/PartBoard.styled';
import theme from '@/styles/theme';
import styled from 'styled-components';

export interface PenaltyProps {
  type: 'penalty' | 'warning';
  content: string;
  date: string;
}

const Container = styled.div`
  width: 100%;
  padding: 15px;
`;

const PenaltyBedge = styled.div<{ $type?: boolean }>`
  padding: 3px 10px;
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
const PenaltyItem: React.FC<PenaltyProps> = ({ type, content, date }) => {
  const badgeType = type === 'penalty';
  return (
    <div>
      <Container>
        <PenaltyBedge $type={badgeType}>
          {badgeType ? '페널티' : '경고'}
        </PenaltyBedge>
        <ContentText>{content}</ContentText>
        <DateText>{date}</DateText>
      </Container>
      <Line />
    </div>
  );
};

export default PenaltyItem;
