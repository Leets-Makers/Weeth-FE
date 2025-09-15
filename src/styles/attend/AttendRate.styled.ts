import theme from '@/styles/theme';
import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AttendText = styled.div`
  margin-top: -2px;
`;

export const AttendName = styled.div`
  margin-top: -2px;
`;

export const RightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Progress = styled.div<{ $attendPercent: number }>`
  width: 325px;
  height: 19px;
  background-color: ${({ $attendPercent }) =>
    $attendPercent === 0 ? theme.color.gray[20] : theme.color.negative};
  border-radius: 10px;
  overflow: hidden;
  margin: 5% 10px 0px 10px;
`;

export const Dealt = styled.div<{ $dealt: number }>`
  width: ${(props) => `${props.$dealt}%`};
  height: 100%;
  border-radius: 10px;
  background-color: ${theme.color.main};
`;

export const AttendPercent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 86%;
  position: relative;
  font-size: 32px;
  margin-top: 5%;
`;
