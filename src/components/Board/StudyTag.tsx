import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  border-radius: 24px;
  height: 20px;
  box-sizing: border-box;
  background-color: ${colors.semantic.container.neutral};
  justify-content: center;
  align-items: center;
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
`;

const StudyTag = ({ studyName }: { studyName: string }) => {
  return <Container>{studyName}</Container>;
};

export default StudyTag;
