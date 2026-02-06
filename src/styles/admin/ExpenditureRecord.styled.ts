import styled from 'styled-components';
import theme from '../theme';
import { units } from '@/theme/designTokens';

export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.semantic.line};
  border-radius: ${units.radius.sm}px;
`;

export const DateWrapper = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
`;

export const Date = styled.div`
  margin-left: 15px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  height: 48px;
  overflow: hidden;
  border-radius: 0 ${units.radius.sm}px 0 0;

  button {
    height: 48px;
  }

  > div {
    height: 48px;

    > div {
      height: 48px;
      border-radius: 0;
    }
  }
`;

export const ExpenditureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export const ExpenditureTitle = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Master = styled.div`
  margin-top: 20px;
  color: ${({ theme }) => theme.semantic.text.alternative};
`;

export const ExpenditureMaster = styled.div`
  font-size: 18px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

export const ReceiptButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.semantic.button.neutral};
  border-radius: ${units.radius.sm}px;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModifyButton = styled.div`
  height: 48px;
`;

export const DeleteButton = styled.div`
  height: 48px;
`;
