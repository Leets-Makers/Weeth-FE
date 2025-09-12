import theme from '@/styles/theme';
import styled from 'styled-components';

interface SmallBoxProps {
  title: string;
  num: string;
}

const SmallStyledBox = styled.div`
  background-color: ${theme.color.gray[30]};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95px;
  height: 93px;
  text-align: center;
`;

const SmallBoxTitle = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

const SmallBoxNum = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-family: ${theme.font.semiBold};
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
