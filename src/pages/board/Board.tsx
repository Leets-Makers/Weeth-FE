import * as S from '@/styles/board/Board.styled';
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
import BreadcrumHomeIcon from '@/assets/images/ic_breadcrum_home.svg?react';
import BreadcrumArrowRightIcon from '@/assets/images/ic_breadcrum_arrow_right.svg?react';
import FloatingWritingIcon from '@/assets/images/ic_floating_writing.svg?react';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  useCustomBack('/home');
  const navigate = useNavigate();

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

  const handleClickHome = () => {
    navigate('/home');
  };

  return (
    <S.Container>
      <S.BoardContainer>
        <S.BoardTitle>
          <S.BreadCrumContainer>
            <BreadcrumHomeIcon onClick={handleClickHome} />
            <BreadcrumArrowRightIcon />
            게시판
          </S.BreadCrumContainer>
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
