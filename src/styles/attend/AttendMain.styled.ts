import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledBox = styled.div`
  width: 315px;
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const StyledAttend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  include-font-padding: false;
`;

export const SemiBold = styled.div`
  font-family: ${theme.font.semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 97%;
  margin-right: 3%;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin-top: 6.6%;
`;
