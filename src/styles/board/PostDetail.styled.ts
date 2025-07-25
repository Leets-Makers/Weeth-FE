import theme from '@/styles/theme';
import styled from 'styled-components';

export const PostMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px 10px 15px;
  gap: 61px;
  word-break: break-all;
  border-bottom: 1px solid ${theme.color.gray[30]};
`;

export const PostMainTitleText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 1.5rem;
`;

export const SmallText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PostMainTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DateText = styled.div`
  margin-left: 0.625rem;
`;

export const PostFileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CommentText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  gap: 2px;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
`;

export const PositionIcon = styled.img`
  height: 1rem;
  width: 1rem;
  margin-right: 0.3125rem;
`;

export const PostingContianer = styled.div`
  font-size: 1rem;
  line-height: 1.1931rem;
  white-space: pre-wrap;
  // margin: 1.25rem 0 1.25rem 0;

  a {
    color: ${theme.color.main};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.color.mainDark};
  }
`;

export const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const PostBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
