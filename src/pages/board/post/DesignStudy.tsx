import CardinalDropdown from '@/components/Board/CardinalDropdown';
import Markdown from '@/components/Board/Markdown';
import StudyDropdown from '@/components/Board/StudyDropdown';
import StudyPostTitle from '@/components/Board/StudyPostTitle';
import WeekDropdown from '@/components/Board/WeekDropdown';
import Header from '@/components/Header/Header';
import theme from '@/styles/theme';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

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

const DesignStudy = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    Number(cardinal) || null,
  );
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const onSave = () => {
    navigate('/board/design');
  };

  return (
    <Container>
      <Header isAccessible RightButtonType="POST" onClickRightButton={onSave}>
        DE 스터디
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
            <WeekDropdown origWeek={selectedWeek} editWeek={setSelectedWeek} />
          </DropdownContainer>
        </DivisionContainer>
        <DivisionContainer>
          <DivisionContainer>스터디</DivisionContainer>
          <StudyDropdown
            origStudy={selectedStudy}
            editStudy={setSelectedStudy}
          />
        </DivisionContainer>
      </InformationContainer>
      <MarkdownContainer>
        <Markdown />
      </MarkdownContainer>
    </Container>
  );
};

export default DesignStudy;
