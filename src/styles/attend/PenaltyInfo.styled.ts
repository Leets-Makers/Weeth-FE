import styled from 'styled-components';
import theme from '../theme';

export const PenaltyContainer = styled.div`
  width: 100%;
  flex-direction: column;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const NoPenaltyInfo = styled.div`
  margin-top: 15px;
  font-size: 16px;
  padding-top: 5px;
`;

export const PenaltyInfo = styled.div`
  color: ${theme.color.gray[65]};
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.6;
`;
