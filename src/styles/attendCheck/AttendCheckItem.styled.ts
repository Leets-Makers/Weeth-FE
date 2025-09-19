import styled from 'styled-components';
import theme from '../theme';

export const MeetingInfoBox = styled.div`
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const MeetingHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  width: 95%;
`;

export const MeetingTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2%;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
`;

export const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 13px 5% 0 5%;
  font-size: 14px;
  line-height: 1.7;
`;
