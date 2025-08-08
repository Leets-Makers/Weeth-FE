import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  border-radius: 24px;
  height: 20px;
  box-sizing: border-box;
  background-color: ${theme.color.gray[18]};
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: ${theme.font.semiBold};
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;

const WeekTag = ({ week }: { week: number }) => {
  return <Container>{week}주차</Container>;
};

export default WeekTag;
