import styled from 'styled-components';
import theme from '@/styles/theme';
import { formatDateTime } from '@/hooks/formatDate';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 345px;
  height: 63px;
  background-color: ${theme.color.gray[18]};
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-color: ${theme.color.gray[9]};
    color: ${theme.color.gray[65]};
  }
`;

const Line = styled.div<{ $isMeeting: boolean }>`
  width: 5px;
  height: 53px;
  background-color: ${(props) =>
    props.$isMeeting ? theme.color.main : '#fff'};
  border-radius: 11px;
  margin-left: 5px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  overflow-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const Date = styled.div`
  font-size: 12px;
`;

const ScheduleItem = ({
  id,
  title,
  start,
  end,
  isMeeting,
  year,
  month,
}: {
  id: number;
  title: string;
  start: string;
  end: string;
  isMeeting: boolean;
  year: number;
  month: number;
}) => {
  const navi = useNavigate();

  const onClick = () => {
    if (isMeeting) {
      navi(`/meetings/${id}`, { state: { year, month } });
    } else {
      navi(`/events/${id}`, { state: { year, month } });
    }
  };

  return (
    <Container onClick={onClick}>
      <Line $isMeeting={isMeeting} />
      <Text>
        <Title>{title}</Title>
        <Date>
          {formatDateTime(start)} ~ {formatDateTime(end)}
        </Date>
      </Text>
    </Container>
  );
};

export default ScheduleItem;
