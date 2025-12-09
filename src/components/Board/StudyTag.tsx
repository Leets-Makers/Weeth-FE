import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
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
  font-size: 12px;
  font-family: ${theme.font.semiBold};
  font-size: 12px;
  color: ${colors.semantic.text.alternative};
`;

const StudyTag = ({ studyName }: { studyName: string }) => {
  return <Container>{studyName}</Container>;
};

export default StudyTag;
