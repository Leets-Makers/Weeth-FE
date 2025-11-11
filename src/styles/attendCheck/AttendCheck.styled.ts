import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${colors.semantic.text.strong};
`;

export const Header = styled.div`
  margin-left: 8%;
`;

export const SemiTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  font-size: 16px;
`;

export const AttendCount = styled.div`
  font-family: ${theme.font.semiBold};
  margin-top: 19px;
  font-size: 32px;
`;

export const SemiBold = styled.div`
  font-family: ${theme.font.semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

export const StyledBox = styled.div`
  background-color: ${colors.semantic.container.neutral};
  border-radius: 14px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 26px;
`;

export const SmallStyledBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 10px;
    width: 100%;
    backround-color: ${colors.semantic.line};
    top: 15px;
  }
`;

export const NullBox = styled.div`
  margin: 20px 0;
`;
