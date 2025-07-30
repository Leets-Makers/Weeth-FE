import theme from '@/styles/theme';
import styled from 'styled-components';
import PostFile from './PostFile';
// import FolderImage from '@/assets/images/ic_folder.svg?react';
// import CloseImage from '@/assets/images/ic_red_close.svg';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  //   height: 264.12px;
  gap: 10px;
`;

const ContentWrapper = styled.textarea`
  padding: 15px 5px 0px 10px;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  min-height: 264.12px;
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

const ContentPost = () => {
  return (
    <Container>
      <ContentWrapper placeholder="내용을 입력하세요" />
      <FileContainer>
        <PostFile fileName="파일명.pdf" isDownload={false} onClick={() => {}} />
      </FileContainer>
    </Container>
  );
};

export default ContentPost;
