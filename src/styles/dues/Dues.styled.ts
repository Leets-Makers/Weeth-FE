import theme from '@/styles/theme';
import { colors, units } from '@/theme/designTokens';
import styled from 'styled-components';
import { pcResponsive } from '..';

export const StyledDues = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
`;

export const CategoryWrapper = styled.div`
  margin: 0 30px;
`;

export const DuesListBox = styled.div`
  width: 92%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  border-radius: 14px;

  padding: 15px;
  background-color: ${colors.dark.neutral[300]};
`;

export const DuesList = styled.div`
  width: 100%;
  margin: 0 10px;

  &::before {
    content: '';
    display: block;
    background-color: ${colors.semantic.line};
    width: 100%;
    height: 1px;
    margin-top: 20px;
  }
`;

export const MoneyBoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const MoneyBox = styled.div`
  font-size: 25px;
  font-family: ${theme.font.semiBold};
  margin-left: 15px;
  align-items: start;
`;

export const NullText = styled.div`
  font-size: 25px;
  font-family: ${theme.font.semiBold};
  margin-top: 20px;
  justify-content: center;
  text-align: center;
`;
