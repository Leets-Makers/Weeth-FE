import styled from 'styled-components';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Container = styled.div`
  width: 100%;
  margin-top: 15px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const TextBox = styled.div`
  ${typography.Sub2};
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: -3px;
`;

export const MemoText = styled.div<{ $isTruncated: boolean }>`
  ${typography.Sub2};
  color: ${colors.semantic.text.normal};
  overflow-wrap: break-word;
  ${({ $isTruncated }) => $isTruncated && `max-width: 80%;`}
`;

export const Amount = styled.div`
  ${typography.Sub2};
  color: ${colors.semantic.text.normal};
  white-space: nowrap;
`;

export const SubText = styled.div`
  margin-top: 6px;
  ${typography.Caption2};
  color: ${colors.dark.neutral[600]};
`;
