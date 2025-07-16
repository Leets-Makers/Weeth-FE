import * as S from '@/styles/board/Board.styled';
import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';
import useCustomBack from '@/hooks/useCustomBack';
import NoticePreview from '@/components/Board/NoticePreview';
import PartBoard from '@/components/Board/PartBoard';
import EduMaterial from '@/components/Board/EduMaterial/EduMaterial';

export interface BoardContent {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
}

const Board = () => {
  useCustomBack('/home');
  const navigate = useNavigate();

  const handleRightButton = () => {
    navigate('/board/search');
  };

  return (
    <S.Container>
      <Header
        isAccessible
        RightButtonType="SEARCH"
        onClickRightButton={handleRightButton}
      >
        게시판
      </Header>
      <S.BoardContainer>
        <NoticePreview />
        <PartBoard />
        <EduMaterial />
      </S.BoardContainer>
    </S.Container>
  );
};

export default Board;
