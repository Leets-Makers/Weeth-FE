import * as S from '@/styles/board/Board.styled';
import Header from '@/components/Header/Header';
import useCustomBack from '@/hooks/useCustomBack';
import NoticePreview from '@/components/Board/NoticePreview';
import PartBoard from '@/components/Board/PartBoard';
import EduMaterial from '@/components/Board/EduMaterial/EduMaterial';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import useGetEducationBoard from '@/api/useGetEducationBoard';
import Loading from '@/components/common/Loading';
import useGetAllCardinals from '@/api/useGetCardinals';

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
  isNew: boolean;
  studyName: string;
  week: number;
  parts: string[];
}

const Board = () => {
  useCustomBack('/home');

  const { currentCardinal } = useGetAllCardinals();
  const { recentNoticeLoading } = useGetRecentNotice();
  const { isLoading: eduLoading } = useGetEducationBoard({
    part: 'ALL',
    cardinalNumber: currentCardinal ?? 0,
    pageSize: 10,
    pageNumber: 0,
  });

  const combinedLoading = useSmartCombinedLoading(
    recentNoticeLoading,
    eduLoading,
  );

  if (combinedLoading) {
    return (
      <S.Container>
        <Loading />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Header isAccessible RightButtonType="none">
        게시판
      </Header>
      <S.BoardContainer>
        <PartBoard />
        <NoticePreview />
        <EduMaterial />
      </S.BoardContainer>
    </S.Container>
  );
};

export default Board;
