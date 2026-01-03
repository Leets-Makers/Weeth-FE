import formatDateTime from '@/hooks/formatDateTime';
import { PageHeader } from '@/pages/attend/Penalty';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DuesHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
  font-size: 18px;
  width: 100%;
`;

const DateText = styled.span`
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
  margin-top: 10px;
  gap: 11px;
  display: flex;
  flex-direction: row;
`;

const CaptionButton = styled.button`
  ${typography.Button1};
  background-color: ${colors.semantic.button.neutral};
  color: ${colors.semantic.text.strong};

  border: none;
  border-radius: ${units.radius.md}px;
  cursor: pointer;

  padding: ${units.margin[200]}px ${units.padding[400]}px;

  &:hover {
    background-color: ${colors.semantic.button['neutral-interaction']};
  }
`;

interface DuesTitleProps {
  time: string;
}

const DuesTitle: React.FC<DuesTitleProps> = ({ time }) => {
  const navi = useNavigate();

  const formattedTime = time ? formatDateTime(time) : 'N/A';

  return (
    <DuesHeaderContainer>
      <PageHeader>
        회비
        <CaptionButton onClick={() => navi('/receipt')}>영수증</CaptionButton>
      </PageHeader>
      <DateText>
        <div>최근 업데이트</div>
        <div>{formattedTime}</div>
      </DateText>
    </DuesHeaderContainer>
  );
};

export default DuesTitle;
