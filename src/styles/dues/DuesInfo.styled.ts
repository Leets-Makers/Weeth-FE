import styled from 'styled-components';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const DuesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledDuesBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
`;

export const StyledCaptionBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const StyledTextBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  max-width: 60%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

export const StyledMemoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  width: 30%;
`;

export const Text = styled.p`
  ${typography.Sub2};
  color: ${colors.semantic.text.strong};
  margin: 0;
`;

export const SmallText = styled.span`
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
  margin-top: 2px;
`;
