import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Container = styled.div`
  height: 36px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  box-sizing: border-box;
  border: 1px solid ${colors.semantic.line};
  background-color: #ffffff0d;
  border-radius: ${units.radius.sm}px;
  padding: 6px 8px;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const FileName = styled.div`
  ${typography.Button2};
  color: ${colors.semantic.text.normal};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
