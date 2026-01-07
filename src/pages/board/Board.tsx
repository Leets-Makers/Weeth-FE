import * as S from '@/styles/board/Board.styled';
import NoticePreview from '@/components/Board/NoticePreview';
import PartBoard from '@/components/Board/PartBoard';
import EduMaterial from '@/components/Board/EduMaterial/EduMaterial';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import useGetEducationBoard from '@/api/useGetEducationBoard';
import Loading from '@/components/common/Loading';
import useGetAllCardinals from '@/api/useGetCardinals';
import { useEffect, useState } from 'react';
import FloatingWritingIcon from '@/assets/images/ic_floating_writing.svg?react';
import Breadcrumb from '@/components/common/Breadcrumb';

const Board = () => {
  const { currentCardinal } = useGetAllCardinals();

  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    currentCardinal ?? null,
  );

  useEffect(() => {
    if (currentCardinal) {
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
      <S.FloatingButton>
        <FloatingWritingIcon />
      </S.FloatingButton>
    </S.Container>
  );
};

export default Board;
