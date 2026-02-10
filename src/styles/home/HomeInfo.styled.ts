import styled from 'styled-components';

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  font-weight: bold;
  gap: 10px;
  align-self: flex-end;
`;

export const NickNameContainer = styled.div`
  font-size: 14px;
  margin-left: 8px;
  align-self: flex-end;
  padding-bottom: 5px;
`;

export const Admin = styled.img`
  margin-bottom: -1.5px;
`;
