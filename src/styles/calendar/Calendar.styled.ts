import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 370px;
  padding-bottom: 40px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  color: white;
`;

export const ImgButton = styled.img`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  cursor: pointer;
`;
