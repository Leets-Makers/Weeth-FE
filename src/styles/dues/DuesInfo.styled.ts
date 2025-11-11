import styled from 'styled-components';
import { colors } from '@/theme/designTokens';

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
  font-size: 16px;
  color: ${colors.semantic.text.strong};
  margin: 0;
  line-height: 1.4;
`;

export const SmallText = styled.span`
  font-size: 13px;
  color: ${colors.dark.neutral[600]};
  margin-top: 2px;
`;
