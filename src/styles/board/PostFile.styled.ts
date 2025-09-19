import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  height: 36px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  box-sizing: border-box;
  border: 1px solid ${theme.color.gray[30]};
  background-color: ${theme.color.gray[18]};
  border-radius: 5px;
  padding: 6px 8px;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const FolderIcon = styled.img`
  width: 1rem;
  height: 1rem;
  align-items: center;
  justify-content: center;
`;

export const FileName = styled.div`
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightIcon = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;
