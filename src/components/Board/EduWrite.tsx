import theme from '@/styles/theme';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import Header from '@/components/Header/Header';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import Markdown from '@/components/Board/Markdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { PartTypes } from '@/types/part';
import PartDropdown from './PartDropdown';

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

type RealPart = Exclude<PartTypes, '' | 'ALL'>;

interface StudyWriteTemplateProps {
  headerTitle: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
  selectedPart: RealPart[];
  setSelectedPart: Dispatch<SetStateAction<RealPart[]>>;
  onSave: () => void;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const EduWrite = ({
  headerTitle,
  title,
  setTitle,
  selectedCardinal,
  setSelectedCardinal,
  selectedPart,
  setSelectedPart,
  content,
  setContent,
  files,
  setFiles,
  onSave,
}: StudyWriteTemplateProps) => {
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
          </DropdownContainer>
        </DivisionContainer>
        <DivisionContainer>
          파트
          <DropdownContainer>
            <PartDropdown value={selectedPart} onChange={setSelectedPart} />
          </DropdownContainer>
        </DivisionContainer>
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

export default EduWrite;
