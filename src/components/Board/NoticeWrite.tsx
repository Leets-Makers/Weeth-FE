import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import Markdown from '@/components/Board/Markdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { originFile } from '@/pages/board/part/PartEdit';
import { units } from '@/theme/designTokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${units.margin['300']}px;
`;

const MarkdownContainer = styled.div`
  display: flex;
`;

interface StudyWriteTemplateProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
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
}: StudyWriteTemplateProps) => {
  return (
    <Container>
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
