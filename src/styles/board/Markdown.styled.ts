import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE, PC, pcResponsive } from '@/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${theme.color.gray[18]};
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: ${MOBILE};

  ${pcResponsive}
`;

export const MarkdownTapContainer = styled.div`
  display: flex;
  height: 44px;
  box-sizing: border-box;
  overflow-x: auto;
  flex-shrink: 0;
  cursor: grab;
  border-bottom: 1px solid ${theme.color.gray[30]};
  border-radius: 10px 10px 0 0;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  background-color: #3567c0;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledImg = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0000001a;
  }
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  margin: 0 5px;
`;

export const PreviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PreviewWrapper = styled.div`
  padding: 15px 5px 0px 10px;
  width: 100%;
  white-space: normal;
  box-sizing: border-box;
  height: 340.12px;
  color: ${theme.color.gray[100]};
  background-color: ${theme.color.gray[18]};
  border: none;
  resize: none;
  font-size: 16px;
  font-family: ${theme.font.regular};
  overflow-y: auto;
  scrollbar-gutter: stable;

  @media (min-width: ${PC}) {
    max-width: ${PC};
    height: calc(100vh - 400px);
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

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  &table {
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

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.color.gray[65]};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  scrollbar-width: thin;
  scrollbar-color: ${theme.color.gray[65]} transparent;
`;

export const FileContainer = styled.div`
  display: flex;
  overflow-x: auto;
  height: 56px;
  box-sizing: border-box;
  padding: 10px;
  gap: 10px;
`;
