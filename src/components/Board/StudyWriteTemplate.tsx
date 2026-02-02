import theme from '@/styles/theme';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { originFile } from '@/pages/board/part/PartEdit';
import WeekDropdown from '@/components/Board/WeekDropdown';
import Markdown from '@/components/Board/Markdown';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import StudyDropdown from '@/components/Board/StudyDropdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { pcResponsive } from '@/styles';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import { RealPart } from '@/types/part';
import PartToggle from './PartToggle';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: ${units.device.mobile}px;
  box-sizing: border-box;
  gap: ${units.margin['300']}px;

  ${pcResponsive}
`;

export const InformationContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${typography.Caption1};
  color: ${theme.color.gray[65]};
`;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const MarkdownContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;

  ${pcResponsive}
`;

interface StudyWriteTemplateProps {
  category: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
  selectedWeek: number | null;
  setSelectedWeek: Dispatch<SetStateAction<number | null>>;
  selectedStudy: string | null;
  setSelectedStudy: Dispatch<SetStateAction<string | null>>;
  selectedPart?: string;
  setSelectedPart?: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  originFiles?: originFile[];
  setOriginFiles?: Dispatch<SetStateAction<originFile[]>>;
}

const StudyWriteTemplate = ({
  category,
  title,
  setTitle,
  selectedCardinal,
  setSelectedCardinal,
  selectedWeek,
  setSelectedWeek,
  selectedStudy,
  setSelectedStudy,
  selectedPart,
  setSelectedPart,
  content,
  setContent,
  originFiles = [],
  setOriginFiles,
  files,
  setFiles,
}: StudyWriteTemplateProps) => {
  const isStudyLog = category === 'StudyLog' || category === 'study';

  const handlePartToggle = (part: string) => {
    if (setSelectedPart) {
      setSelectedPart(part);
    }
  };

  return (
    <Container>
      {selectedPart !== undefined && setSelectedPart && (
        <PartToggle
          selectedPart={selectedPart as 'FE' | 'BE' | 'D' | 'PM'}
          onToggle={handlePartToggle}
        />
      )}
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
        {isStudyLog && selectedPart && (
          <DivisionContainer>
            <DivisionContainer>스터디</DivisionContainer>
            <StudyDropdown
              origStudy={selectedStudy}
              editStudy={setSelectedStudy}
              selectedPart={selectedPart as RealPart}
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
