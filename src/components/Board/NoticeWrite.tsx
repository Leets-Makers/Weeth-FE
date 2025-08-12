import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import Header from '@/components/Header/Header';
import Markdown from '@/components/Board/Markdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarkdownContainer = styled.div`
  display: flex;
  padding: 10px 15px;
`;

interface StudyWriteTemplateProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  onSave: () => void;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const NoticeWrite = ({
  title,
  setTitle,
  content,
  setContent,
  files,
  setFiles,
  onSave,
}: StudyWriteTemplateProps) => {
  return (
    <Container>
      <Header isAccessible RightButtonType="POST" onClickRightButton={onSave}>
        공지사항
      </Header>
      <StudyPostTitle title={title} setTitle={setTitle} />
      <MarkdownContainer>
        <Markdown
          content={content}
          setContent={setContent}
          files={files}
          setFiles={setFiles}
        />
      </MarkdownContainer>
    </Container>
  );
};

export default NoticeWrite;
