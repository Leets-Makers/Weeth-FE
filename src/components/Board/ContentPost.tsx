import theme from '@/styles/theme';
import styled from 'styled-components';
import { RefObject } from 'react';
import useAutoList from '@/hooks/useAutoList';
// import PostFile from '@/components/Board/PostFile';
// import FolderImage from '@/assets/images/ic_folder.svg?react';
// import CloseImage from '@/assets/images/ic_red_close.svg';

const Container = styled.div`
  // position: relative;
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

const FileContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
`;

// const PostFile = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 36px;
//   box-sizing: border-box;
//   border-radius: 5px;
//   border: 1px solid ${theme.color.gray[30]};
//   background-color: ${theme.color.gray[18]};
//   padding: 6px 8px;
//   gap: 8px;
//   color: ${theme.color.gray[100]};
//   font-size: 14px;
//   font-family: ${theme.font.regular};
// `;

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
      <FileContainer>
        {/* <PostFile fileName="파일명.pdf" isDownload={false} onClick={() => {}} /> */}
      </FileContainer>
    </Container>
  );
};

export default ContentPost;
