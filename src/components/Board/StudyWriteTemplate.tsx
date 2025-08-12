import theme from '@/styles/theme';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import CardinalDropdown from './CardinalDropdown';
import Markdown from './Markdown';
import StudyDropdown from './StudyDropdown';
import StudyPostTitle from './StudyPostTitle';
import WeekDropdown from './WeekDropdown';
import Header from '../Header/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
          files={files}
          setFiles={setFiles}
        />
      </MarkdownContainer>
    </Container>
  );
};

export default StudyWriteTemplate;
