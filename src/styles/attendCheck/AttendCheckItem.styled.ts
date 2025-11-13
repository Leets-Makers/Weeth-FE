import styled from 'styled-components';
import typography from '@/theme/typography';

export const MeetingInfoBox = styled.div`
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const MeetingHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const MeetingTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 9px;
  ${typography.Sub2};
`;

export const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  ${typography.Body1};
`;
