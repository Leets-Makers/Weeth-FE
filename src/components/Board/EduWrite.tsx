import { Dispatch, SetStateAction } from 'react';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import Markdown from '@/components/Board/Markdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import { PartTypes } from '@/types/part';
import PartDropdown from '@/components/Board/PartDropdown';
import { originFile } from '@/pages/board/part/PartEdit';
import {
  Container,
  DivisionContainer,
  DropdownContainer,
  InformationContainer,
  MarkdownContainer,
} from './StudyWriteTemplate';

type RealPart = Exclude<PartTypes, '' | 'ALL'>;

interface StudyWriteTemplateProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
  selectedPart: RealPart[];
  setSelectedPart: Dispatch<SetStateAction<RealPart[]>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  originFiles?: originFile[];
  setOriginFiles?: Dispatch<SetStateAction<originFile[]>>;
}

const EduWrite = ({
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
  originFiles,
  setOriginFiles,
}: StudyWriteTemplateProps) => {
  return (
    <Container>
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
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
        />
      </MarkdownContainer>
    </Container>
  );
};

export default EduWrite;
