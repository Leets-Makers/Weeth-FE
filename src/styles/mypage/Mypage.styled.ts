import { colors } from '@/theme/designTokens';
import styled from 'styled-components';
import theme from '../theme';

export const Container = styled.div`
  width: 370px;
  padding-bottom: 50px;
  font-size: 16px;
`;

export const TextButton = styled.div<{ $isSignOut?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${({ $isSignOut }) =>
    $isSignOut ? 'none' : `1px solid ${colors.semantic.line}`};
  color: ${({ $isSignOut }) =>
    $isSignOut ? colors.semantic.state.error : 'white'};
  cursor: pointer;
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px 0px 0px;
  cursor: pointer;
`;

export const Account = styled.div`
  display: flex;
  flex-direction: row;
  padding: 94px 25px 0px 25px;
`;

export const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 370px;
`;

export const Title = styled.h2`
  font-family: ${theme.font.semiBold};
  font-size: 20px;
  margin: 20px 0 10px 10px;
`;

export const Box = styled.div`
  width: 345px;
  background-color: ${colors.semantic.container.neutral};
  border: 1px solid ${colors.semantic.line};
  border-radius: 14px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  font-family: ${theme.font.semiBold};
`;
