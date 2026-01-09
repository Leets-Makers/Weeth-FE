import styled from 'styled-components';
import { formatDateTime } from '@/hooks/formatDate';
import { useNavigate } from 'react-router-dom';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 339px;
  height: 63px;
  background-color: ${colors.semantic.container.neutral};
  border-radius: ${units.radius.md}px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-color: ${colors.semantic.button.neutral};
    color: ${colors.semantic.text.alternative};
  }
`;

const Line = styled.div<{ $isMeeting: boolean }>`
  width: 5px;
  height: 45px;
  background-color: ${(props) =>
    props.$isMeeting
      ? colors.semantic.brand.primary
      : colors.semantic.icon.normal};
  border-radius: 11px;
  margin-left: 5px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.div`
  ${typography.Body1};
  color: ${colors.semantic.text.strong};
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
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
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
