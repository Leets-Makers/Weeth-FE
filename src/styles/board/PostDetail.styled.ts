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
  white-space: pre-wrap;

  a:hover {
    color: ${theme.color.mainDark};
  }

  img,
  video,
  iframe {
    display: block;
    max-width: 100%;
    height: auto;
  }

  & h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
    margin: 0;
    line-height: 1.4;
    padding: 0;
  }

  & code {
    background-color: ${theme.color.gray[30]};
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
  }

  & pre {
    background-color: ${theme.color.gray[30]};
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre-wrap;
  }

  & a {
    color: ${theme.color.main};
    text-decoration: none;
    line-height: 1.4;
  }

  & li {
    line-height: 1.4;
    margin: 0;
  }

  & ul,
  & ol {
    margin: 0;
    padding-left: 10px;
    line-height: 1.4;
    list-style-position: inside;
  }

  & p {
    margin: 0;
    padding: 0;
    line-height: 1.2;
  }

  li:has(p > input[type='checkbox']) {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 6px;
    padding-left: 0;
  }

  & li:has(> input[type='checkbox']) > input[type='checkbox'] {
    flex-shrink: 0;
    transform: scale(0.9);
    margin: 0;
  }

  li p {
    display: inline;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }

  & blockquote {
    margin: 0;
    padding-left: 8px;
    border-left: 3px solid ${theme.color.main};
    color: ${theme.color.gray[80]};
    font-style: italic;
  }

  & h1,
  h2,
  h3,
  h4,
  & ul,
  ol,
  li,
  & p {
    white-space: normal;
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
