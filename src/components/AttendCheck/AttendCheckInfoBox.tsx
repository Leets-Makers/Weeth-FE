import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

interface SmallBoxProps {
  title: string;
  num: string;
}

const SmallStyledBox = styled.div`
  background-color: ${colors.semantic.button.neutral};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 93px;
  text-align: center;
`;

const SmallBoxTitle = styled.div`
  margin-top: 15px;
  ${typography.Body2};
`;

const SmallBoxNum = styled.div`
  margin-top: 20px;
  ${typography.Sub1};
`;

const AttendCheckInfoBox: React.FC<SmallBoxProps> = ({ title, num }) => {
  return (
    <SmallStyledBox>
      <SmallBoxTitle>{title}</SmallBoxTitle>
      <SmallBoxNum>{num}</SmallBoxNum>
    </SmallStyledBox>
  );
};

export default AttendCheckInfoBox;
