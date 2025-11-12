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
import { useEffect, useState } from 'react';

const Board = () => {
  useCustomBack('/home');

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
      <Header isAccessible RightButtonType="none">
        게시판
      </Header>
      <S.BoardContainer>
        <PartBoard />
        <NoticePreview data={recentNotices} error={error} />
        <EduMaterial
          data={recentEdu}
          selectedCardinal={selectedCardinal}
          onCardinalChange={setSelectedCardinal}
        />
      </S.BoardContainer>
    </S.Container>
  );
};

export default Board;
