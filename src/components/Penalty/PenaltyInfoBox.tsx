import theme from '@/styles/theme';
import styled from 'styled-components';

export interface PenaltyInfoBoxProps {
  penaltyCount: number;
  warningCount: number;
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  max-width: 370px;
  padding: 17px 0px;
  margin: 20px 15px 10px 15px;

  background-color: ${theme.color.gray[18]};
  border: 1px solid #ffffff1a;
  border-radius: 10px;
`;

const Half = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LeftGroup = styled(Half)`
  justify-content: flex-start;
  gap: 8px;
`;

const RightGroup = styled(Half)`
  justify-content: flex-start;
  gap: 8px;
`;

const Separator = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 21px;
  background: #ffffff1a;
`;

const CountText = styled.span`
  font-size: 18px;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
  line-height: 1;
  white-space: nowrap;
`;

const InfoText = styled.span`
  color: #ffffff66;
  font-family: ${theme.font.regular};
  font-size: 14px;
  line-height: 1;
  margin-left: 15px;
`;

const PenaltyInfoBox: React.FC<PenaltyInfoBoxProps> = ({
  penaltyCount,
  warningCount,
}) => {
  return (
    <Container>
      <Separator />

      <LeftGroup>
        <InfoText>페널티</InfoText>
        <CountText>{penaltyCount}회</CountText>
      </LeftGroup>

      <RightGroup>
        <InfoText>경고</InfoText>
        <CountText>{warningCount}회</CountText>
      </RightGroup>
    </Container>
  );
};

export default PenaltyInfoBox;
