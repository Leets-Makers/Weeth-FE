import styled from 'styled-components';
import { colors } from '@/theme/designTokens';

export const Container = styled.div`
  width: 88%;
  margin: 16px 6% 0 6%;
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
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: -2px;
`;

export const MemoText = styled.div<{ $isTruncated: boolean }>`
  font-size: 16px;
  color: ${colors.semantic.text.normal};
  overflow-wrap: break-word;
  ${({ $isTruncated }) => $isTruncated && `max-width: 80%;`}
`;

export const Amount = styled.div`
  font-size: 16px;
  color: ${colors.semantic.text.normal};
  white-space: nowrap;
`;

export const SubText = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: ${colors.dark.neutral[600]};
`;
