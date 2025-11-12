import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: inherit;
    background-color: ${colors.semantic.line};
  }
`;

export const PenaltyBedge = styled.div<{ $type?: boolean }>`
  max-width: 52px;
  padding: 3px 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  background-color: ${({ $type }) => ($type ? '#FFB20040' : '#FF585840')};
  color: ${({ $type }) =>
    $type ? colors.semantic.state.caution : colors.semantic.state.error};
`;
export const ContentText = styled.div`
  color: ${colors.semantic.text.strong};
  ${typography.Sub2};
  margin-top: 10px;
`;

export const DateText = styled.div`
  color: ${colors.semantic.text.alternative};
  ${typography.Caption2};
  margin-top: 15px;
`;
