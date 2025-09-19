import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const PenaltyBedge = styled.div<{ $type?: boolean }>`
  max-width: 52px;
  padding: 3px 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  background-color: ${({ $type }) => ($type ? '#FFB20040' : '#FF585840')};
  color: ${({ $type }) => ($type ? theme.color.caution : theme.color.negative)};
`;
export const ContentText = styled.text`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
  line-height: 1;
  margin-top: 10px;
`;

export const DateText = styled.text`
  color: #ffffff66;
  font-family: ${theme.font.regular};
  margin-top: 15px;
  font-size: 12px;
  line-height: 1;
`;
export const PaddingDiv = styled.div`
  padding: 0 5px;
`;

export const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.gray[18]};
`;
