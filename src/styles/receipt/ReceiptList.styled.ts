import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const StyledReceipt = styled.div`
  width: 100%;
  position: relative;
  padding: 16px 0 20px 0;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: ${colors.semantic.line};
  }
`;

export const StyledMonth = styled.div`
  ${typography.Sub1};
  width: 100%;
`;

export const ScrollContainer = styled.div`
  display: flex;
  margin-top: 15px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
`;

export const GridItem = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 0;
  background-color: ${colors.semantic.backGround};
  width: 30%;
  height: 124px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;

export const OpenModalButton = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  border: none;
`;

export const GridItemImage = styled.embed`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  scroll: no;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalImage = styled.embed`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const PdfWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
`;

export const PdfBox = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 0;
  background-color: ${colors.semantic.backGround};
  width: 56%;
  height: 124px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${colors.semantic.line};
  position: relative;
  white-space: nowrap;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${colors.semantic.container['neutral-interaction']};
  }
`;
