import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE, PC } from '@/styles';

export const CommentContainer = styled.div<{ $isSelect: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 9px 15px;
  background-color: ${(props) =>
    props.$isSelect ? '#508FFF1A' : 'transparent'};
  transition: background-color 0.3s ease;
  word-break: break-all;

  width: 100%;
  max-width: ${MOBILE};

  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;

export const CommentContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3125rem;
  align-items: start;
`;

export const NameText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PositionIcon = styled.img`
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.3125rem;
`;

export const ContentText = styled.div`
  font-size: 1rem;
  line-height: 1.1931rem;

  a {
    color: ${theme.color.main};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.color.mainDark};
  }
`;

export const DateText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 0.75rem;
`;

export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const ReplyCommentContainer = styled.div`
  width: ${MOBILE};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: flex-start;
  word-break: break-all;
  gap: 10px;
`;

export const ReplyArrow = styled.img`
  width: 20px;
  height: 20px;
`;

export const ReplyContentContainer = styled.div`
  flex: 1;
  background-color: ${theme.color.gray[18]};
  border-radius: 0.5rem;
  padding: 10px 0 10px 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;
`;

export const ReplyImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
`;
