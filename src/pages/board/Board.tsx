import * as S from '@/styles/board/Board.styled';
import NoticePreview from '@/components/Board/NoticePreview';
import PartBoard from '@/components/Board/PartBoard';
import EduMaterial from '@/components/Board/EduMaterial/EduMaterial';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import useGetEducationBoard from '@/api/useGetEducationBoard';
import Loading from '@/components/common/Loading';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import useCardinalData from '@/hooks/queries/useCardinalData';
import BoardWriteFloatingButton from '@/components/Board/BoardWriteFloatingButton';

const Board = () => {
  const { currentCardinal } = useCardinalData();

  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);

  useEffect(() => {
    if (currentCardinal !== null) {
      setSelectedCardinal(currentCardinal);
    }
  }, [currentCardinal]);

  const { recentNotices, recentNoticeLoading, error } = useGetRecentNotice();

  const { data: eduBoardData, isLoading: eduLoading } = useGetEducationBoard({
    part: 'ALL',
    cardinalNumber: selectedCardinal ?? currentCardinal ?? undefined,
    pageSize: 10,
    pageNumber: 0,
  });

  const combinedLoading = useSmartCombinedLoading(
    recentNoticeLoading,
    eduLoading,
  );

  if (combinedLoading)
    return (
      <S.Container>
        <Loading />
      </S.Container>
    );

  const recentEdu = eduBoardData?.pages.flatMap((page) => page.content) ?? [];

  return (
    <S.Container>
      <S.BoardContainer>
        <S.BoardTitle>
          <Breadcrumb items={[{ label: '게시판' }]} hasTitle />
          게시판
        </S.BoardTitle>
        <PartBoard />
        <NoticePreview data={recentNotices} error={error} />
        <EduMaterial
          data={recentEdu}
          selectedCardinal={selectedCardinal}
          onCardinalChange={setSelectedCardinal}
        />
      </S.BoardContainer>
      <BoardWriteFloatingButton />
    </S.Container>
  );
};

export default Board;
