import styled from 'styled-components';
import theme from '../theme';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Wrapper = styled.div`
  width: 94.7%;
  margin-left: 2.5%;
  background-color: ${({ theme }) => theme.semantic.backGround};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0 solid ${({ theme }) => theme.semantic.line};
  border-width: 0 1px 1px;
  border-radius: 0 0 ${units.radius.md}px ${units.radius.md}px;
  &:last-child {
    margin-bottom: 15px;
  }
`;

export const SearchWrapper = styled.div`
  width: 98%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 15px 15px;
`;

export const SearchBar = styled.div`
  width: 70%;
  height: 48px;
  border-radius: ${units.radius.sm}px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  color: #4e4e4e;
  font-size: 18px;
  padding-left: 10px;
`;

export const EditButton = styled.button`
  ${typography.admin.Button1};
  background-color: transparent;
  border: none;
  font-size: 18px;
`;

export const Edit = styled.div`
  ${typography.admin.Button1};
  width: 64px;
  height: 48px;
  background-color: ${({ theme }) => theme.semantic.button.neutral};
  color: ${({ theme }) => theme.semantic.text.strong};
  border-radius: ${units.radius.md}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelButton = styled.div`
  ${typography.admin.Button1};
  width: 64px;
  height: 48px;
  background-color: ${({ theme }) => theme.semantic.button.neutral};
  border-radius: ${units.radius.md}px;
  color: ${({ theme }) => theme.semantic.text.strong};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SaveButton = styled.div`
  ${typography.admin.Button1};
  width: 64px;
  height: 48px;
  background-color: ${({ theme }) => theme.semantic.button.primary};
  color: ${({ theme }) => theme.semantic.text.inverse};
  border-radius: ${units.radius.md}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const UserWrapper = styled.div`
  width: 95%;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.semantic.line};
  border-radius: ${units.radius.sm}px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-collapse: collapse;
  border-spacing: 0;
  overflow: hidden;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 162px;
  height: 48px;
  font-family: ${theme.font.semiBold};
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 18px;
`;

export const InfoBox = styled.div`
  ${typography.admin.Sub2};
  color: ${({ theme }) => theme.semantic.text.alternative};
  border-left: 1px solid ${({ theme }) => theme.semantic.line};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  ${typography.admin.Sub2}
  color:${({ theme }) => theme.semantic.text.alternative};
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  display: flex;
  align-items: center;
  padding: 15px 0 15px 16px;
`;

export const Attend = styled.div`
  ${typography.admin.Sub2};
  color: ${({ theme }) => theme.semantic.text.alternative};
  width: 162px;
  border-left: 1px solid ${({ theme }) => theme.semantic.line};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MemberWrapper = styled.div`
  display: flex;
  width: 100%;

  &:last-child {
    & > div {
      border-bottom: none;
    }
  }
`;

export const Member = styled.div`
  flex: 1;
  height: 74px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding-left: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
`;

export const UserName = styled.div`
  ${typography.admin.Sub2}
`;

export const UserInfo = styled.div`
  ${typography.admin.Body2};
  display: flex;
  gap: 4px;
`;

export const Position = styled.span`
  color: ${({ theme }) => theme.semantic.text.normal};
`;

export const DepartmentAndId = styled.span`
  color: ${({ theme }) => theme.semantic.text.alternative};
`;

export const Check = styled.div`
  width: 162px;
  height: 74px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  border-left: 1px solid ${({ theme }) => theme.semantic.line};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const CheckGap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const StatusText = styled.span<{ status: string }>`
  ${typography.admin.Sub1};
  color: ${({ status, theme }) =>
    status === '출석'
      ? theme.semantic.state.success
      : status === '결석'
        ? theme.semantic.state.error
        : theme.semantic.icon.alternative};
`;

export const StatusWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const StatusBox = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.semantic.line};
  &:last-child {
    border-right: none;
  }
`;

export const SearchBarWrapper = styled.div`
  width: 60%;
`;
