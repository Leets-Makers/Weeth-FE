import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE, pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const PostMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${units.margin['200']}px;
  padding: 0 ${units.padding['450']}px ${units.padding['400']}px
    ${units.padding['450']}px;
  gap: 40px;
  word-break: break-all;
  border-bottom: 1px solid ${theme.color.gray[30]};
  width: 100%;
  max-width: ${MOBILE};
  box-sizing: border-box;

  ${pcResponsive}
`;

export const PostMainTitleText = styled.div`
  wdith: 100%;
  ${typography.H3};
  colors: ${colors.semantic.text.normal};
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SmallText = styled.div`
  color: ${colors.semantic.text.alternative};
  ${typography.Caption2}
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PostMainTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

export const DateText = styled.div`
  margin-left: 11px;
`;

export const PostFileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${units.margin['200']}px;
`;

export const CommentText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  ${typography.Caption1};
  color: ${colors.semantic.text.normal};
`;

export const PositionIcon = styled.img`
  height: 1rem;
  width: 1rem;
  margin-right: 5px;
`;

export const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${units.margin['300']}px;
`;

export const PostingContianer = styled.div`
  white-space: normal;
  width: 100%;

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
  h4,
  h5,
  h6 {
    white-space: pre-wrap;
    font-weight: bold;
    line-height: 1.4;
    padding: 0;
  }

  & code {
    background-color: ${theme.color.gray[30]};
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
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
    white-space: pre-wrap;
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
    white-space: pre-wrap;
  }

  & blockquote {
    margin: 0;
    padding-left: 8px;
    border-left: 3px solid ${theme.color.main};
    color: ${theme.color.gray[80]};
    font-style: italic;
  }

  &table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  th,
  td {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 12px;
    vertical-align: top;
  }
  thead th {
    background: ${theme.color.gray[30]};
  }

  & hr {
    margin: 12px 0;
  }

  ul.contains-task-list,
  ol.contains-task-list {
    padding-left: 0;
    margin-left: 0;
  }

  li.task-list-item {
    list-style: none;
    margin-left: 0;
  }
`;

export const PostBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${units.margin['300']}px;
`;
