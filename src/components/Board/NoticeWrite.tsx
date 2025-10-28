import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import Header from '@/components/Header/Header';
import Markdown from '@/components/Board/Markdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { originFile } from '@/pages/board/part/PartEdit';
import useSetHeader from '@/hooks/useSetHeader';

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
  originFiles?: originFile[];
  setOriginFiles?: Dispatch<SetStateAction<originFile[]>>;
}

const NoticeWrite = ({
  title,
  setTitle,
  content,
  setContent,
  files,
  setFiles,
  originFiles,
  setOriginFiles,
  onSave,
}: StudyWriteTemplateProps) => {
  useSetHeader({
    title: '공지사항',
    rightButtonType: 'POST',
    isAccessible: true,
    onClickRightButton: onSave,
  });
  return (
    <Container>
      <Header />
      <StudyPostTitle title={title} setTitle={setTitle} />
      <MarkdownContainer>
        <Markdown
          content={content}
          setContent={setContent}
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
          files={files}
          setFiles={setFiles}
        />
      </MarkdownContainer>
    </Container>
  );
};

export default NoticeWrite;
