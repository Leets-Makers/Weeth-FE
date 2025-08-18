import theme from '@/styles/theme';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { originFile } from '@/pages/board/part/PartEdit';
import Header from '@/components/Header/Header';
import WeekDropdown from '@/components/Board/WeekDropdown';
import Markdown from '@/components/Board/Markdown';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import StudyDropdown from '@/components/Board/StudyDropdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { MOBILE, pcResponsive } from '@/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MOBILE};

  ${pcResponsive}
`;

const InformationContainer = styled.div`
  display: flex;
  padding: 10px 15px;
  gap: 5px;
`;

const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.semiBold};
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const MarkdownContainer = styled.div`
  display: flex;
  padding: 10px 15px;
  width: 100%;
  max-width: ${MOBILE};
  box-sizing: border-box;

  ${pcResponsive}
`;

interface StudyWriteTemplateProps {
  category: string;
  headerTitle: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
  selectedWeek: number | null;
  setSelectedWeek: Dispatch<SetStateAction<number | null>>;
  selectedStudy: string | null;
  setSelectedStudy: Dispatch<SetStateAction<string | null>>;
  onSave: () => void;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  originFiles?: originFile[];
  setOriginFiles?: Dispatch<SetStateAction<originFile[]>>;
}

const StudyWriteTemplate = ({
  category,
  headerTitle,
  title,
  setTitle,
  selectedCardinal,
  setSelectedCardinal,
  selectedWeek,
  setSelectedWeek,
  selectedStudy,
  setSelectedStudy,
  content,
  setContent,
  originFiles = [],
  setOriginFiles,
  files,
  setFiles,
  onSave,
}: StudyWriteTemplateProps) => {
  const isStudyLog = category === 'StudyLog' || category === 'study';

  return (
    <Container>
      <Header isAccessible RightButtonType="POST" onClickRightButton={onSave}>
        {headerTitle}
      </Header>
      <StudyPostTitle title={title} setTitle={setTitle} />
      <InformationContainer>
        <DivisionContainer>
          구분
          <DropdownContainer>
            <CardinalDropdown
              origValue={selectedCardinal}
              editValue={setSelectedCardinal}
            />
            {isStudyLog && (
              <WeekDropdown
                origWeek={selectedWeek}
                editWeek={setSelectedWeek}
              />
            )}
          </DropdownContainer>
        </DivisionContainer>
        {isStudyLog && (
          <DivisionContainer>
            <DivisionContainer>스터디</DivisionContainer>
            <StudyDropdown
              origStudy={selectedStudy}
              editStudy={setSelectedStudy}
            />
          </DivisionContainer>
        )}
      </InformationContainer>
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

export default StudyWriteTemplate;
