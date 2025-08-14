import theme from '@/styles/theme';
import styled from 'styled-components';
import { RefObject } from 'react';
import useAutoList from '@/hooks/useAutoList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentWrapper = styled.textarea`
  all: unset;
  padding: 15px 5px 0px 10px;
  width: 100%;
  box-sizing: border-box;
  height: 264.12px;
  color: ${theme.color.gray[100]};
  background-color: ${theme.color.gray[18]};
  border: none;
  resize: none;
  font-size: 16px;
  font-family: ${theme.font.regular};
  overflow-y: auto;
  scrollbar-gutter: stable;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }

  &:focus {
    outline: none;
    box-shadow: none !important;
    border: none;
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

interface ContentPostProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (newValue: string) => void;
}

const ContentPost = ({ textareaRef, value, onChange }: ContentPostProps) => {
  const { handleKeyDown, isComposingRef } = useAutoList(
    textareaRef,
    value,
    onChange,
  );

  return (
    <Container>
      <ContentWrapper
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="내용을 입력하세요"
        onKeyDown={handleKeyDown}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
        }}
      />
    </Container>
  );
};

export default ContentPost;
