import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE, PC } from '@/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3.125rem;
  align-self: center;

  width: 100%;
  max-width: ${MOBILE};
  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  padding-top: 15px;

  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;

export const TabContainerWrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 15px;
  border-bottom: 2px solid ${theme.color.gray[20]};
`;

export const TabTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

export const TabText = styled.div`
  padding: 10px 15px 0px 15px;
  font-size: 16px;
  color: white;
  font-family: ${theme.font.semiBold};
`;

export const Underline = styled.div`
  height: 2px;
  background-color: ${theme.color.main};
  margin-bottom: -2px;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${theme.color.gray[12]};
  padding: 15px 10px;
  gap: 15px;
`;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px 50px;
`;

export const TotalPostNumber = styled.div`
  padding: 0px 15px;
  gap: 8px;
  color: ${theme.color.gray[65]};
  font-size: 12px;
  font-family: ${theme.font.regular};
`;

export const PostListItemContainer = styled.div`
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #262626;
  }
`;

export const Line = styled.div`
  border: 1px solid;
  width: 366px;
  color: ${(props) => props.theme.color.gray[18]};

  @media (min-width: ${PC}) {
    width: ${PC};
  }
`;

export const Text = styled.div`
  text-align: center;
  margin: 0.625rem;
  font-family: ${theme.font.semiBold};
`;

export const PostingButtonContainer = styled.div`
  position: fixed;
  display: flex;
  bottom: 0.9375rem;
  justify-content: end;
  width: 100%;
  max-width: 23.4375rem;
  z-index: 10;
`;
