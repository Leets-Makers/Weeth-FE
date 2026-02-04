import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { originFile } from '@/pages/board/part/PartEdit';
import WeekDropdown from '@/components/Board/WeekDropdown';
import Markdown from '@/components/Board/Markdown';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import StudyDropdown from '@/components/Board/StudyDropdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
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
  width: 100%;
  align-items: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`;

export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 0 auto;
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
`;

export const StudySectionWrapper = styled.div`
  flex: 1 1 0;
  min-width: 0;
`;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 0;
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
          <CardinalDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
          />
        </DivisionContainer>
        <DivisionContainer>
          주차 수
          {isStudyLog && (
            <WeekDropdown origWeek={selectedWeek} editWeek={setSelectedWeek} />
          )}
        </DivisionContainer>
        {isStudyLog && selectedPart && (
          <StudySectionWrapper>
            <DivisionContainer style={{ width: '100%' }}>
              스터디
              <StudyDropdown
                origStudy={selectedStudy}
                editStudy={setSelectedStudy}
                selectedPart={selectedPart as RealPart}
              />
            </DivisionContainer>
          </StudySectionWrapper>
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
